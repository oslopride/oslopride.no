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
		localize(
			{
				title: "Body",
				name: "body",
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
		{
			title: "url",
			name: "url",
			type: "string",
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
