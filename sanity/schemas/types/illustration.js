export default {
	title: "Illustration",
	name: "illustration",
	type: "image",
	options: {
		hotspot: true
	},
	fields: [
		{
			title: "Caption",
			name: "caption",
			type: "string",
			options: {
				isHighlighted: true
			}
		},
		{
			title: "Alternative text",
			name: "alt",
			type: "string",
			description: "Important for SEO and accessiblity.",
			options: {
				isHighlighted: true
			},
			validation: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			imageUrl: "asset.url",
			title: "caption"
		}
	}
};
