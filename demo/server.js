const http = require('http');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end('["aaaa","bbbbb"]');
}).listen(3000);
