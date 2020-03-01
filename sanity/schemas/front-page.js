import { localize } from "../utils/locale";

export default {
	title: "Front Page",
	name: "frontPage",
	type: "document",
	fieldsets: [{ name: "header", title: "Header" }],
	fields: [
		localize(
			{
				title: "Header",
				name: "header",
				type: "object",
				fields: [
					{
						name: "title",
						title: "Title",
						type: "string",
						validate: Rule => Rule.required()
					},
					{
						name: "subtitle",
						title: "Subtitle",
						type: "string",
						validate: Rule => Rule.required()
					},
					{
						title: "Links",
						name: "links",
						type: "array",
						of: [{ type: "internalLink" }, { type: "externalLink" }]
					},
					{
						title: "Image",
						name: "image",
						type: "image",
						options: {
							hotspot: true
						},
						validate: Rule => Rule.required()
					}
				]
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		),
		localize({
			title: "Blocks",
			name: "blocks",
			type: "blocks"
		})
	],
	preview: {
		prepare: () => ({ title: "Front Page" })
	}
};
