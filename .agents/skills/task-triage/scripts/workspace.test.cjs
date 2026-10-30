'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { prepare } = require('./prepare-workspace.cjs');

function fixture(t, starter = 'none') {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'workflow-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const root = path.join(base, 'task');
  prepare(root, starter);
  const tool = path.join(root, 'tools/worklog.cjs');
  const run = (args, input) => spawnSync(process.execPath, [tool, ...args], { cwd: root, input, encoding: 'utf8' });
  const events = () => fs.readFileSync(path.join(root, 'worklog/events.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
  return { base, root, tool, run, events };
}

test('scaffold creates actual JS project and preserves original instructions', t => {
  const f = fixture(t, 'js');
  fs.writeFileSync(path.join(f.root, 'README.md'), 'original task');
  fs.writeFileSync(path.join(f.root, 'AGENTS.md'), 'original instructions');
  const again = prepare(f.root, 'js');
  assert.equal(again.created.length, 0);
  assert.equal(fs.readFileSync(path.join(f.root, 'README.md'), 'utf8'), 'original task');
  assert.equal(fs.readFileSync(path.join(f.root, 'AGENTS.md'), 'utf8'), 'original instructions');
  const cli = spawnSync(process.execPath, ['app/cli.cjs', 'app/input.example.json'], { cwd: f.root, encoding: 'utf8' });
  assert.equal(cli.status, 0);
  assert.deepEqual(JSON.parse(cli.stdout), { recordCount: 2 });
});

test('changed code or symlink collision is reported without overwriting', t => {
  const f = fixture(t, 'js');
  const file = path.join(f.root, 'app/core.cjs');
  fs.writeFileSync(file, 'user code');
  assert.throws(() => prepare(f.root, 'js'), /preserve existing code/);
  assert.equal(fs.readFileSync(file, 'utf8'), 'user code');
  const other = path.join(f.base, 'other'); fs.mkdirSync(other);
  const target = path.join(f.base, 'symlink-task'); fs.mkdirSync(target);
  fs.symlinkSync(other, path.join(target, 'docs'));
  assert.throws(() => prepare(target), /symlink/);
  assert.deepEqual(fs.readdirSync(other), []);
});

test('request text, actor decision and real successful command are linked', t => {
  const f = fixture(t);
  const text = '한글 요청\n0과 0012를 유지해 줘.\n';
  const request = f.run(['request'], text);
  assert.equal(request.status, 0, request.stderr);
  const requestId = request.stdout.trim();
  const entry = f.events()[0];
  assert.equal(fs.readFileSync(path.join(f.root, entry.textFile), 'utf8'), text);
  const note = f.run(['note', '--request', requestId, '--actor', 'user', '--type', 'expectation'],
    JSON.stringify({ summary: 'ID를 문자열로 보존', expected: '0012 유지' }));
  assert.equal(note.status, 0, note.stderr);
  const run = f.run(['run', '--request', requestId, '--', process.execPath, '-e', 'console.log("actual=0012")']);
  assert.equal(run.status, 0, run.stderr);
  const events = f.events();
  assert.equal(events[1].actor, 'user');
  const finish = events.find(x => x.type === 'run_finished');
  assert.equal(finish.requestId, requestId);
  assert.match(fs.readFileSync(path.join(f.root, finish.stdout), 'utf8'), /actual=0012/);
});

test('failed commands, missing executables and invalid notes are not successes', t => {
  const f = fixture(t);
  const requestId = f.run(['request'], '실패도 기록').stdout.trim();
  assert.equal(f.run(['note', '--request', requestId, '--actor', 'ai', '--type', 'decision'], '{}').status, 2);
  assert.equal(f.run(['run', '--request', requestId, '--', process.execPath, '-e', 'process.exit(7)']).status, 7);
  const missing = f.run(['run', '--request', requestId, '--', 'missing-workflow-executable-123']);
  assert.equal(missing.status, 1);
  const finishes = f.events().filter(x => x.type === 'run_finished');
  assert.equal(finishes[0].exitCode, 7);
  assert.match(finishes[1].error, /ENOENT/);
  assert.equal(f.run(['run', '--request', requestId, '--', 'git', 'push']).status, 2);
});

test('chat captures two prompts before execution, resumes and filters reasoning (fake CLI)', t => {
  const f = fixture(t);
  const fake = path.join(f.base, 'fake-codex.cjs');
  fs.writeFileSync(fake, `#!/usr/bin/env node
let text = ''; process.stdin.setEncoding('utf8');
process.stdin.on('data', x => text += x);
process.stdin.on('end', () => {
  console.log(JSON.stringify({type:'thread.started',thread_id:'session-test-1'}));
  console.log(JSON.stringify({type:'item.completed',item:{type:'reasoning',text:'excluded test text'}}));
  console.log(JSON.stringify({type:'item.completed',item:{type:'agent_message',text:'응답 '+text}}));
  console.log(JSON.stringify({type:'test_args',args:process.argv.slice(2)}));
});\n`);
  fs.chmodSync(fake, 0o700);
  const run = f.run(['chat', '--codex', fake], '첫 요청\n/send\n두 번째\n/send\n/exit\n');
  assert.equal(run.status, 0, run.stderr);
  const events = f.events();
  const requests = events.filter(x => x.type === 'request');
  const starts = events.filter(x => x.type === 'run_started');
  assert.equal(requests.length, 2);
  assert.equal(requests[0].capture, 'harness-before-codex');
  assert.equal(starts[1].argv.includes('resume'), true);
  assert.equal(starts[1].argv.includes('session-test-1'), true);
  for (const item of events.filter(x => x.type === 'run_finished')) {
    const output = fs.readFileSync(path.join(f.root, item.stdout), 'utf8');
    assert.equal(output.includes('excluded test text'), false);
    assert.match(output, /응답/);
    const transmitted = fs.readFileSync(path.join(f.root, item.inputFile), 'utf8');
    assert.match(transmitted, /<worklog-context>/);
    assert.ok(transmitted.includes(item.requestId));
  }
});

test('chat failures stop and unsubmitted drafts are distinct', t => {
  const f = fixture(t);
  const failed = f.run(['chat', '--codex', 'missing-workflow-cli-123'], '보낸 요청\n/send\n');
  assert.equal(failed.status, 1);
  const draft = f.run(['chat'], '아직 보내지 않은 생각\n/exit\n');
  assert.equal(draft.status, 0);
  assert.ok(f.events().some(x => x.type === 'unsent'));
  assert.ok(f.events().some(x => x.capture === 'harness-unsent-draft'));
  const fake = path.join(f.base, 'no-session-cli.cjs');
  fs.writeFileSync(fake, '#!/usr/bin/env node\nprocess.stdin.resume();\n');
  fs.chmodSync(fake, 0o700);
  const unsupported = f.run(['chat', '--codex', fake], '요청\n/send\n');
  assert.equal(unsupported.status, 2);
  assert.ok(f.events().some(x => x.type === 'protocol_error'));
});
