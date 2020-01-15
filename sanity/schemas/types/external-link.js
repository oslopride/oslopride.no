export default {
	title: "Extrnal Link",
	name: "external_link",
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
