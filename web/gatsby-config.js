module.exports = {
	plugins: [
		"gatsby-plugin-styled-components",
		{
			resolve: "gatsby-source-sanity",
			options: {
				projectId: "2ger3rla",
				dataset: "future"
			}
		}
	]
};
