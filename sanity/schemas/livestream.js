import { localize } from "../utils/locale";

export default {
	title: "Livestream",
	name: "livestream",
	type: "document",
	fieldsets: [{ name: "header", title: "Header" }],
	fields: [
		{
			name: "active",
			type: "boolean",
			description: "This indicates that the livestream is ongoing",
			validation: Rule => Rule.required()
		},
		{
			title: "YouTube",
			name: "youtube",
			type: "youtube"
		},
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
		}
	],
	preview: {
		prepare: () => ({ title: "Livestream" })
	}
};
