import { localize } from "../utils/locale";

export default {
	title: "Partner Overview",
	name: "partnerOverview",
	type: "document",
	fieldsets: [{ name: "header", title: "Header" }],
	fields: [
		localize(
			{
				title: "Title",
				name: "title",
				type: "string"
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		),
		localize(
			{
				title: "Subtitle",
				name: "subtitle",
				type: "string"
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		),
		{
			title: "Image",
			name: "image",
			type: "image",
			options: {
				hotspot: true
			},
			validate: Rule => Rule.required()
		},
		localize({
			title: "Call to action",
			name: "callToAction",
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
					title: "Description",
					name: "description",
					type: "array",
					of: [{ type: "block" }]
				},
				{
					title: "Link",
					name: "link",
					type: "internalLink"
				}
			]
		})
	],
	preview: {
		prepare: () => ({ title: "Partner Overview" })
	}
};
