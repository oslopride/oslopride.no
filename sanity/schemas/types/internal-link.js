export default {
	title: "Internal Link",
	name: "internal_link",
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
			to: [{ type: "page" }, { type: "front_page" }],
			validate: Rule => Rule.required()
		}
	]
};
