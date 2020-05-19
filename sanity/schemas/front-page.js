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
			title: "Headliners",
			name: "headliners",
			type: "array",
			of: [
				{
					title: "Headliner",
					name: "headliner",
					type: "object",
					fields: [
						{ title: "Title", name: "title", type: "string" },
						{ title: "Subtitle", name: "subtitle", type: "string" }
					]
				}
			]
		}),
		{
			title: "Featured Events",
			name: "featuredEvents",
			type: "array",
			of: [{ type: "reference", to: [{ type: "simpleEvent" }] }],
			validate: Rule => Rule.max(3)
		},
		localize({
			title: "Call to Action",
			name: "callToAction",
			type: "advertisement"
		}),
		{
			title: "Featured Articles",
			name: "featuredArticles",
			type: "array",
			of: [{ type: "reference", to: [{ type: "article" }] }],
			validate: Rule => Rule.max(3)
		}
	],
	preview: {
		prepare: () => ({ title: "Front Page" })
	}
};
