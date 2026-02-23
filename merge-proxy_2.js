const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3131;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Account-Token, X-Api-Key, Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse the target path from query param
  const parsed = url.parse(req.url, true);
  const endpoint = parsed.query.endpoint || 'accounts';
  const pageSize = parsed.query.page_size || 10;
  const apiKey = req.headers['x-api-key'];
  const accountToken = req.headers['x-account-token'];

  const options = {
    hostname: 'api.merge.dev',
    path: `/api/accounting/v1/${endpoint}?page_size=${pageSize}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-Account-Token': accountToken,
      'Content-Type': 'application/json'
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (e) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  });

  proxyReq.end();
});

server.listen(PORT, () => {
  console.log(`\n✓ Merge proxy running at http://localhost:${PORT}\n`);
});
