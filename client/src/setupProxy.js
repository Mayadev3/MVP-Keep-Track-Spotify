//This would require back-end routes to all begin with /api or something, which is good preparation for SPA deployment.
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
//here it is saying use the /api with every backend route like : /api/favorites NOT /favorites only
