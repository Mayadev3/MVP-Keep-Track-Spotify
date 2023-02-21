//This would require back-end routes to all begin with /api or something, which is good preparation for SPA deployment.

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
