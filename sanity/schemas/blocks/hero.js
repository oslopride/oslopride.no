export default {
	title: "Hero",
	name: "hero",
	type: "object",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string"
		},
		{
			title: "Subtitle",
			name: "subtitle",
			type: "string"
		},
		{
			title: "Buttons",
			name: "buttons",
			type: "array",
			of: [{ type: "link" }]
		},
		{
			title: "Image",
			name: "image",
			type: "illustration"
		}
	]
};
