export default {
	title: "Extrnal Link",
	name: "externalLink",
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
			type: "url",
			validate: Rule => Rule.required()
		}
	]
};
