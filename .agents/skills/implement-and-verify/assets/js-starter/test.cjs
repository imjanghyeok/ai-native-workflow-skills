'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { analyze } = require('./core.cjs');
const { createServer } = require('./server.cjs');

test('core accepts zero and string IDs without mutating input', () => {
  const input = { records: [{ id: '0012', value: 0 }] };
  const snapshot = JSON.stringify(input);
  assert.deepEqual(analyze(input), { recordCount: 1 });
  assert.equal(JSON.stringify(input), snapshot);
  assert.deepEqual(analyze({ records: [] }), { recordCount: 0 });
});

test('invalid schemas fail', () => {
  for (const input of [null, {}, { records: null }, { records: [null] }, { records: [3] }]) {
    assert.throws(() => analyze(input));
  }
});

test('CLI real file, missing file and missing argument', () => {
  const cli = path.join(__dirname, 'cli.cjs');
  const ok = spawnSync(process.execPath, [cli, path.join(__dirname, 'input.example.json')], { encoding: 'utf8' });
  assert.equal(ok.status, 0);
  assert.deepEqual(JSON.parse(ok.stdout), { recordCount: 2 });
  for (const args of [[], [path.join(__dirname, 'does-not-exist.json')]]) {
    const error = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
    assert.equal(error.status, 2);
    assert.equal(error.stdout, '');
    assert.ok(error.stderr);
  }
});

test('HTTP normal, invalid, limits and static allowlist', async () => {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const url = `http://127.0.0.1:${server.address().port}`;
    const call = (body, type = 'application/json') => fetch(`${url}/api/analyze`, {
      method: 'POST', headers: { 'Content-Type': type }, body,
    });
    assert.equal((await fetch(`${url}/health`)).status, 200);
    for (const file of ['/', '/app.js', '/style.css']) {
      const response = await fetch(url + file);
      assert.equal(response.status, 200);
      assert.ok((await response.text()).length > 0);
    }
    const ok = await call('{"records":[{"id":"0012","value":0}]}');
    assert.equal(ok.status, 200);
    assert.deepEqual(await ok.json(), { recordCount: 1 });
    assert.equal((await call('broken')).status, 400);
    assert.equal((await call('{"records":null}')).status, 400);
    assert.equal((await call('{}', 'text/plain')).status, 415);
    assert.equal((await call('x'.repeat(65537))).status, 413);
    assert.equal((await fetch(`${url}/api/analyze`)).status, 405);
    assert.equal((await fetch(`${url}/core.cjs`)).status, 404);
    assert.equal((await fetch(`${url}/does-not-exist`)).status, 404);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
