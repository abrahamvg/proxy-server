const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/status-board/[my-organization-name]', createProxyMiddleware({
  target: `https://raw.githubusercontent.com`,
  changeOrigin: true,
  pathRewrite: {[`^/status-board/`]: '/'},
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('Authorization', 'Bearer [my-token]');
  }
}));

app.use('/status-board/repos', createProxyMiddleware({
  target: `https://api.github.com`,
  changeOrigin: true,
  pathRewrite: {[`^/status-board/`]: '/'},
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('Authorization', 'Bearer [my-token]');
  }
}));

app.listen(3000, () => {
  console.log('Server listening on port ', 3000);
});