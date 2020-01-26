export default {
	title: "Internal Link",
	name: "internalLink",
	type: "object",
	fields: [
		{
			title: "Text",
			name: "text",
			type: "string",
			validate: Rule => Rule.required()
		},
		{
			title: "URL",
			name: "url",
			type: "reference",
			to: [{ type: "page" }, { type: "frontPage" }],
			validate: Rule => Rule.required()
		}
	]
};
