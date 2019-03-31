const express = require('express');
const compiler = require('webpack')(require('./webpack.config'));
var bodyParser = require('body-parser');
const app = express();

const port = 8080;

// EventSource的response
let client;

// webpack配置
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  logLevel: 'warn'
});
app.use(bodyParser.json());
app.use(devMiddleware);
compiler.hooks.done.tap('reload', function () {
  client.write('data: ' + 'reload' + '\n\n');
}.bind(this));

// EventSource
app.use('/__reload__', function (req, res) {
  client = res;
  client.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
});

app.get('/random', function (req, res) {
  res.json({num: Math.random() * 10});
});

app.post('/addone', function (req, res) {
  res.json({num: req.body.num + 1});
});

app.listen(port, () => {
  // 打开浏览器
  require('opn')(`http://localhost:${port}`);
});
