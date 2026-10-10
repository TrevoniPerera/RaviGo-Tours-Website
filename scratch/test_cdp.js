const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9222;

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

(async () => {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + path.join(__dirname, 'edge_profile')
  ]);

  await wait(2500);

  try {
    const targets = await getJson(`http://localhost:${PORT}/json`);
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      console.log('No websocket URL found, targets:', targets);
      return;
    }

    const WebSocket = require('net'); // simple raw or let's check
    console.log('Target found:', pageTarget.webSocketDebuggerUrl);
  } catch (err) {
    console.error('Error connecting to Edge CDP:', err.message);
  } finally {
    edge.kill();
  }
})();
