export default {
	title: "Internal Link",
	name: "internalLink",
	type: "object",
	fields: [
		{
			title: "Text",
			name: "text",
			type: "string",
			validation: Rule => Rule.required()
		},
		{
			title: "URL",
			name: "url",
			type: "reference",
			to: [
				{ type: "page" },
				{ type: "article" },
				{ type: "frontPage" },
				{ type: "articleArchive" },
				{ type: "eventOverview" },
				{ type: "partnerOverview" },
				{ type: "livestream" }
			],
			validation: Rule => Rule.required()
		}
	]
};
