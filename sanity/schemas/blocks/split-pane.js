export default {
	title: "Split Pane",
	name: "splitPane",
	type: "object",
	fields: [
		{
			title: "Left",
			name: "left",
			type: "textArea",
			validate: Rule => Rule.required()
		},
		{
			title: "Right",
			name: "right",
			type: "textArea",
			validate: Rule => Rule.required()
		}
	],
	preview: {
		prepare() {
			return {
				title: "Split Pane"
			};
		}
	}
};
