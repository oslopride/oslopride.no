export default {
	title: "Internal Link",
	name: "internal_link",
	type: "object",
	fields: [
		{
			title: "Text",
			name: "text",
			type: "string"
		},
		{
			title: "URL",
			name: "url",
			type: "reference",
			to: [{ type: "page" }, { type: "front_page" }]
		}
	]
};
