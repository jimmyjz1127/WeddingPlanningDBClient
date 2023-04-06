const { createProxyMiddleware } = require("http-proxy-middleware");
const {full_url} = require('./Config');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: full_url,
      changeOrigin: true,
    })
  );
};
