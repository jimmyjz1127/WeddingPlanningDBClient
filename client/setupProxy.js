const { createProxyMiddleware } = require("http-proxy-middleware");
const {full_url} = require('./src/Config');

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'http://localhost:5050',
      changeOrigin: true,
    })
  );
};
