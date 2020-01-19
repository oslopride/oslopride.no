export default {
	title: "Hero",
	name: "hero",
	type: "object",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string",
			validate: Rule => Rule.required()
		},
		{
			title: "Subtitle",
			name: "subtitle",
			type: "string"
		},
		{
			title: "Links",
			name: "links",
			type: "array",
			of: [{ type: "internal_link" }, { type: "external_link" }]
		},
		{
			title: "Image",
			name: "image",
			type: "illustration"
		}
	],
	preview: {
		select: {
			subtitle: "title",
			media: "image"
		},
		prepare(selection) {
			const { subtitle, media } = selection;
			return {
				title: "Hero",
				subtitle,
				media
			};
		}
	}
};
