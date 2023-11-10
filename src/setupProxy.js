const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/newsapi",
		createProxyMiddleware({
			target: process.env.REACT_APP_NEWSAPI_PROXY_URL,
			changeOrigin: true,
			secure: false,
			pathRewrite: {
				"^/newsapi": "",
			},
		})
	);
};
