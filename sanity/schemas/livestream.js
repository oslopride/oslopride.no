import { localize } from "../utils/locale";

export default {
	title: "Livestream",
	name: "livestream",
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
			validation: Rule => Rule.required()
		},
		localize(
			{
				title: "Body",
				name: "body",
				type: "array",
				of: [
					{ type: "block" },
					{
						type: "image",
						options: { hotspot: true }
					},
					{ type: "youtube" },
					{ type: "iframe" }
				]
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		)
	],
	preview: {
		prepare: () => ({ title: "Livestream" })
	}
};
