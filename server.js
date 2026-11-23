/**
 * LlamaSwap Dashboard — servidor mínimo para servir o HTML
 *
 * Uso:
 *   node server.js                 # porta 8080, abre navegador
 *   node server.js 9000            # porta customizada
 *   node server.js --no-open       # não abre navegador
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { spawn } from 'node:child_process';

const PORT = process.argv[2] ? Number(process.argv[2]) : 8080;
const NO_OPEN = process.argv.includes('--no-open');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer(async (req, res) => {
  // Redireciona raiz para o dashboard
  if (req.url === '/' || req.url === '/index.html') {
    const html = await readFile(join(import.meta.dirname, 'llamaswap-dashboard.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // Serve outros arquivos estáticos (favicon, assets, etc.)
  const filePath = join(import.meta.dirname, 'public', req.url);
  try {
    const data = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[extname(req.url).toLowerCase()] || 'application/octet-stream',
    });
    return res.end(data);
  } catch {
    // Arquivo não encontrado — rejeita para SPA (se necessário)
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}`;
  console.log(`  LlamaSwap Dashboard → ${url}`);
  console.log(`  Ctrl+C para encerrar.\n`);

  if (!NO_OPEN) {
    const cmd = process.platform === 'win32' ? 'cmd' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    const cmdArgs = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
    try { spawn(cmd, cmdArgs, { detached: true, stdio: 'ignore' }).unref(); } catch { /* manual */ }
  }
});
