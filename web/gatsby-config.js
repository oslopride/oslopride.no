module.exports = {
	plugins: [
		"gatsby-plugin-styled-components",
		{
			resolve: "gatsby-source-sanity",
			options: {
				projectId: "2ger3rla",
				dataset: "future"
			}
		},
		{
			resolve: "gatsby-plugin-web-font-loader",
			options: {
				typekit: {
					id: "ygk6hzk"
				}
			}
		}
	]
};
