'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { analyze } = require('./core.cjs');

const STATIC = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
  '/style.css': ['style.css', 'text/css; charset=utf-8'],
};

function json(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}

function createServer() {
  return http.createServer((req, res) => {
    const route = req.url.split('?')[0];
    if (route === '/health' && req.method === 'GET') return json(res, 200, { ok: true });
    if (route === '/api/analyze') {
      if (req.method !== 'POST') return json(res, 405, { error: 'POST required' });
      if ((req.headers['content-type'] || '').split(';')[0].trim() !== 'application/json') {
        req.resume();
        return json(res, 415, { error: 'application/json required' });
      }
      let size = 0;
      const chunks = [];
      let rejected = false;
      req.on('data', chunk => {
        size += chunk.length;
        if (rejected) return;
        if (size > 65536) {
          rejected = true;
          chunks.length = 0;
          return json(res, 413, { error: 'request exceeds 64 KiB' });
        }
        chunks.push(chunk);
      });
      req.on('end', () => {
        if (rejected) return;
        try {
          const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          json(res, 200, analyze(input));
        } catch (error) {
          json(res, 400, { error: error.message });
        }
      });
      req.on('error', () => {
        if (!res.writableEnded && !res.destroyed) json(res, 400, { error: 'request interrupted' });
      });
      return;
    }
    const file = STATIC[route];
    if (!file) return json(res, 404, { error: 'not found' });
    if (req.method !== 'GET') return json(res, 405, { error: 'GET required' });
    try {
      const content = fs.readFileSync(path.join(__dirname, file[0]));
      res.writeHead(200, { 'Content-Type': file[1] });
      res.end(content);
    } catch {
      json(res, 500, { error: 'static file unavailable' });
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('PORT must be an integer from 1 to 65535');
    process.exitCode = 2;
  } else {
    const server = createServer();
    server.on('error', error => { console.error(error.message); process.exitCode = 2; });
    server.listen(port, '0.0.0.0', () => console.log(`Preview: http://localhost:${port}/`));
  }
}

module.exports = { createServer };
