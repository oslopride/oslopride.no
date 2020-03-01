export default {
	title: "Text Area",
	name: "textArea",
	type: "object",
	fields: [
		{
			title: "Text",
			name: "text",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Heading", value: "h2" },
						{ title: "Subheading", value: "h3" },
						{ title: "Normal", value: "normal" }
					],
					lists: [],
					marks: {
						decorators: [
							{ title: "Strong", value: "strong" },
							{ title: "Emphasis", value: "em" }
						]
					}
				}
			]
		}
	],
	preview: {
		prepare() {
			return {
				title: "Text Area"
			};
		}
	}
};
