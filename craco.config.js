/* craco.config.js */
const path = require(`path`);

module.exports = {
	webpack: {
		alias: {
			"@root": path.resolve(__dirname, "src/"),
			"@components": path.resolve(__dirname, "src/components/"),
		},
	},
};
