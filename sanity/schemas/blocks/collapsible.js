export default {
	title: "Collapsible List",
	name: "collapsibleList",
	type: "object",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string",
			validation: Rule => Rule.required()
		},
		{
			title: "List Items",
			name: "listItems",
			type: "array",
			of: [
				{
					title: "List Item",
					name: "listItem",
					type: "object",
					fields: [
						{
							title: "Title",
							name: "title",
							type: "string"
						},
						{
							title: "Content",
							name: "content",
							type: "array",
							of: [
								{
									type: "block",
									styles: [{ title: "Normal", value: "normal" }],
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
					]
				}
			]
		}
	],
	preview: {
		prepare() {
			return {
				title: "Collapsible List"
			};
		}
	}
};
