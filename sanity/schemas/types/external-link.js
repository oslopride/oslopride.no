export default {
	title: "Extrnal Link",
	name: "externalLink",
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
			type: "url",
			validation: Rule => Rule.required()
		}
	]
};
