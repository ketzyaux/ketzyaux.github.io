const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
};

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/index.html';
  const filePath = path.join(ROOT, url);
  const ext = path.extname(filePath).toLowerCase();
  
  const serveFile = (p, e, cb) => {
    fs.readFile(p, (err, data) => {
      if (err) return cb(err);
      res.writeHead(200, { 'Content-Type': MIME[e] || 'application/octet-stream' });
      res.end(data);
    });
  };

  serveFile(filePath, ext, (err) => {
    if (err) {
      // Fallback: If no extension, try appending .html
      if (ext === '') {
        const filePathHtml = filePath + '.html';
        serveFile(filePathHtml, '.html', (err2) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
    }
  });
}).listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
