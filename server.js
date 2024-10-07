const express = require("express");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require('cors')
const app = express();

if (!process.env.GITHUB_TOKEN) {
  throw new Error("Missing GITHUB_TOKEN");
}

const token = process.env.GITHUB_TOKEN;

app.use(
  "/status-board/",
  createProxyMiddleware({
    target: `https://raw.githubusercontent.com`,
    changeOrigin: true,
    pathRewrite: { [`^/status-board/`]: "/" },
    on: {
      proxyReq(proxyReq, req, res) {
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
    },
  })
);

app.use(
  "/status-board/repos",
  createProxyMiddleware({
    target: `https://api.github.com`,
    changeOrigin: true,
    pathRewrite: { [`^/status-board/`]: "/" },
    on: {
      proxyReq(proxyReq, req, res) {
        console.log(proxyReq, "Hit");
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
    },
  })
);

app.use(cors())

app.listen(3000, () => {
  console.log("Server listening on port ", 3000);
});
