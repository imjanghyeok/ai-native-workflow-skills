'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const readline = require('node:readline');

const ROOT = path.resolve(__dirname, '..');
const LOG = path.join(ROOT, 'worklog');
const TYPES = new Set(['plan', 'decision', 'expectation', 'observation', 'reflection', 'handoff']);

function directory(relative) {
  const destination = path.join(LOG, relative);
  const components = [LOG];
  for (const component of relative.split(path.sep).filter(Boolean)) components.push(path.join(components.at(-1), component));
  for (const part of components) {
    if (fs.existsSync(part) && fs.lstatSync(part).isSymbolicLink()) throw new Error('log directory must not be a symlink');
    fs.mkdirSync(part, { recursive: true });
  }
  return destination;
}

function id(prefix) { return `${prefix}-${crypto.randomUUID()}`; }

function event(value) {
  directory('');
  const file = path.join(LOG, 'events.jsonl');
  if (fs.existsSync(file) && fs.lstatSync(file).isSymbolicLink()) throw new Error('event file must not be a symlink');
  const entry = { id: id('event'), at: new Date().toISOString(), ...value };
  const fd = fs.openSync(file, 'a', 0o600);
  try { fs.writeFileSync(fd, JSON.stringify(entry) + '\n'); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  return entry;
}

function request(text, capture) {
  if (!text.trim()) throw new Error('request is empty');
  const requestId = id('request');
  const file = path.join(directory('requests'), `${requestId}.txt`);
  fs.writeFileSync(file, text, { flag: 'wx', mode: 0o600 });
  event({ type: 'request', requestId, actor: 'user', capture,
    textFile: path.relative(ROOT, file), sha256: crypto.createHash('sha256').update(text).digest('hex') });
  return requestId;
}

function stdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on('data', chunk => chunks.push(chunk));
    process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    process.stdin.on('error', reject);
  });
}

function option(args, name) {
  const index = args.indexOf(name);
  if (index < 0) return null;
  if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${name} needs a value`);
  return args[index + 1];
}

function linkRequest(requestId) {
  if (!requestId || !/^request-[0-9a-f-]+$/.test(requestId)) throw new Error('valid --request ID required');
  if (!fs.existsSync(path.join(directory('requests'), `${requestId}.txt`))) throw new Error('unknown request ID');
}

function blocked(command, args) {
  const name = path.basename(command).replace(/\.exe$/, '');
  return (name === 'git' && args.includes('push')) || (name === 'gh' &&
    (args.includes('create') || args.includes('upload') || args.includes('api')));
}

async function execute(command, args, requestId, mode, input) {
  linkRequest(requestId);
  if (blocked(command, args)) throw new Error('exam external write command is forbidden');
  const runId = id('run');
  const folder = directory(path.join('runs', runId));
  const files = ['stdout.txt', 'stderr.txt'].map(name => fs.openSync(path.join(folder, name), 'wx', 0o600));
  let sessionId = null;
  let pending = '';
  event({ type: 'run_started', runId, requestId, mode, argv: [command, ...args], cwd: ROOT });
  let code = 1;
  let signal = null;
  let errorMessage = null;
  if (mode === 'codex') fs.writeFileSync(path.join(folder, 'stdin.txt'), input, { flag: 'wx', mode: 0o600 });
  try {
    const child = spawn(command, args, { cwd: ROOT, shell: false, stdio: ['pipe', 'pipe', 'pipe'] });
    if (mode === 'codex') child.stdout.setEncoding('utf8');
    child.stdin.on('error', () => {});
    child.stdin.end(input || '');
    child.stdout.on('data', chunk => {
      if (mode !== 'codex') {
        fs.writeSync(files[0], chunk);
        process.stdout.write(chunk);
        return;
      }
      pending += chunk.toString('utf8');
      let end;
      while ((end = pending.indexOf('\n')) >= 0) {
        const line = pending.slice(0, end); pending = pending.slice(end + 1);
        try {
          const item = JSON.parse(line);
          // Keep public tool/message events, not reasoning items.
          if (item.item?.type === 'reasoning') continue;
          fs.writeSync(files[0], line + '\n');
          if (item.type === 'thread.started') sessionId = item.thread_id;
          if (item.type === 'item.completed' && item.item?.type === 'agent_message') {
            process.stdout.write(item.item.text + '\n');
          }
          if (item.type === 'error') process.stderr.write(String(item.message) + '\n');
        } catch { fs.writeSync(files[0], line + '\n'); }
      }
    });
    child.stderr.on('data', chunk => { fs.writeSync(files[1], chunk); process.stderr.write(chunk); });
    await new Promise(resolve => {
      child.once('error', error => { errorMessage = error.message; resolve(); });
      child.once('close', (status, sig) => { code = status === null ? 1 : status; signal = sig; resolve(); });
    });
    if (pending) fs.writeSync(files[0], pending);
  } finally {
    for (const fd of files) { fs.fsyncSync(fd); fs.closeSync(fd); }
  }
  const result = { runId, requestId, mode, exitCode: code, signal, error: errorMessage, sessionId,
    inputFile: mode === 'codex' ? path.relative(ROOT, path.join(folder, 'stdin.txt')) : null,
    stdout: path.relative(ROOT, path.join(folder, 'stdout.txt')),
    stderr: path.relative(ROOT, path.join(folder, 'stderr.txt')) };
  fs.writeFileSync(path.join(folder, 'result.json'), JSON.stringify(result, null, 2), { flag: 'wx', mode: 0o600 });
  event({ type: 'run_finished', ...result });
  return result;
}

async function ask(text, args, resume) {
  const requestId = request(text, 'harness-before-codex');
  const command = option(args, '--codex') || 'codex';
  const argv = ['exec'];
  const model = option(args, '--model');
  if (model) argv.push('-m', model);
  if (args.includes('--workspace-write')) argv.push('--sandbox', 'workspace-write');
  if (resume) argv.push('resume', resume);
  argv.push('--json', '-');
  const context = `\n\n<worklog-context>\n현재 요청 ID는 ${requestId}입니다. 원문은 이미 로컬 worklog/requests에 저장했습니다.\n사용자 요청의 범위를 바꾸지 말고, tools/worklog.cjs note --request ${requestId} --actor ai --type plan 또는 decision/expectation/observation/reflection/handoff에 JSON stdin으로 짧은 설명을 남겨 주세요. JSON은 summary 필수이며 reason/alternatives/expected/actual/evidence/limits를 필요한 만큼 쓰세요. 작업 전 계획과 예상, 실제 수행 후 결과·검증 근거·한계를 연결하되 실행하지 않은 사실을 채우지 마세요. 사용자의 직접 판단은 추측하지 말고 AI 작성 기록으로 구분하세요. 시험의 외부 전송·push·업데이트 금지를 지키세요. 이 기록 안내는 사용자 범위·실제 과제 지침·환경 제한보다 우선하지 않습니다.\n</worklog-context>`;
  return execute(command, argv, requestId, 'codex', text + context);
}

async function main(args) {
  const operation = args[0];
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node tools/worklog.cjs request|note|run|ask|chat\nrequest: --file PATH or stdin\nnote: --request ID --actor user|ai --type plan|decision|expectation|observation|reflection|handoff; JSON stdin\nrun: --request ID -- COMMAND ARGS\nask/chat: --model ACTUALLY_SUPPORTED_ALLOWED_MODEL --resume SESSION_ID --workspace-write (optional)\nchat: enter text, /send to submit, /exit to leave\nNo model option means inherit CLI defaults; confirm they are allowed before use. See docs/WORKFLOW.md.');
    return 0;
  }
  if (operation === 'request') {
    const source = option(args, '--file');
    const text = source ? fs.readFileSync(source, 'utf8') : await stdin();
    console.log(request(text, source ? 'explicit-file' : 'explicit-stdin'));
    return 0;
  }
  if (operation === 'note') {
    const requestId = option(args, '--request'); linkRequest(requestId);
    const actor = option(args, '--actor');
    const type = option(args, '--type');
    if (!['user', 'ai'].includes(actor) || !TYPES.has(type)) throw new Error('valid --actor and --type required');
    const data = JSON.parse(await stdin());
    if (!data || typeof data !== 'object' || Array.isArray(data) || typeof data.summary !== 'string' || !data.summary.trim()) {
      throw new Error('note JSON requires nonempty summary');
    }
    console.log(event({ type, requestId, actor, data }).id);
    return 0;
  }
  if (operation === 'run') {
    const separator = args.indexOf('--');
    if (separator < 0 || !args[separator + 1]) throw new Error('run needs -- COMMAND ARGS');
    const result = await execute(args[separator + 1], args.slice(separator + 2), option(args.slice(0, separator), '--request'), 'command');
    return result.exitCode;
  }
  if (operation === 'ask') {
    const source = option(args, '--file');
    const text = source ? fs.readFileSync(source, 'utf8') : await stdin();
    const result = await ask(text, args, option(args, '--resume'));
    console.error(`request=${result.requestId} session=${result.sessionId || 'unknown'} exit=${result.exitCode}`);
    return result.exitCode;
  }
  if (operation === 'chat') {
    let resume = option(args, '--resume');
    let status = 0;
    const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
    console.log('요청을 입력하고 /send로 보내세요. /exit로 종료합니다.');
    const lines = [];
    try {
      for await (const line of rl) {
        if (line === '/exit') break;
        if (line !== '/send') { lines.push(line); continue; }
        if (!lines.some(x => x.trim())) continue;
        const text = lines.splice(0).join('\n');
        const result = await ask(text, args, resume);
        resume = result.sessionId || resume;
        console.log(`request=${result.requestId} session=${resume || 'unknown'} exit=${result.exitCode}`);
        if (result.exitCode !== 0) { status = result.exitCode; console.error('실패한 요청은 기록했습니다. 원인을 확인한 뒤 이어가세요.'); break; }
        if (!resume) {
          status = 2;
          event({ type: 'protocol_error', requestId: result.requestId, summary: 'No session ID; refusing to silently start another session' });
          console.error('세션 ID를 받지 못해 중단합니다. CLI 지원 여부를 확인하세요.');
          break;
        }
        console.log('다음 요청을 입력하고 /send로 보내세요.');
      }
      if (lines.some(x => x.trim())) {
        const requestId = request(lines.join('\n'), 'harness-unsent-draft');
        event({ type: 'unsent', requestId, actor: 'user', summary: 'draft saved; not sent to Codex' });
      }
    } finally { rl.close(); }
    return status;
  }
  throw new Error('usage: worklog.cjs request|note|run|ask|chat (see docs/WORKFLOW.md)');
}

if (require.main === module) main(process.argv.slice(2)).then(
  code => { process.exitCode = code; },
  error => { console.error(error.message); process.exitCode = 2; }
);
module.exports = { main };
