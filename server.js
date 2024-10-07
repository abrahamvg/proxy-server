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
  "/raw-github-content/",
  createProxyMiddleware({
    target: `https://raw.githubusercontent.com`,
    changeOrigin: true,
    pathRewrite: { [`^/raw-github-content/`]: "/" },
    on: {
      proxyReq(proxyReq, req, res) {
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
    },
  })
);

app.use(
  "/api-github-content/",
  createProxyMiddleware({
    target: `https://api.github.com`,
    changeOrigin: true,
    pathRewrite: { [`^/api-github-content/`]: "/" },
    on: {
      proxyReq(proxyReq, req, res) {
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
    },
  })
);

app.use(cors())

app.listen(3000, () => {
  console.log("Server listening on port ", 3000);
});
