import supportedLanguages from "../supported-languages";
import { getDefaultLanguage, localize } from "../utils/locale";
import { MdFormatAlignLeft } from "react-icons/md";

export default {
	title: "Article",
	name: "article",
	icon: MdFormatAlignLeft,
	type: "document",
	fields: [
		localize(
			{
				title: "Title",
				name: "title",
				type: "string"
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		),
		{
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: "title.en.id"
			},
			validation: Rule => Rule.required()
		},
		{
			title: "Publish date",
			name: "publishedAt",
			type: "date",
			description: "Set the publishing date of article",
			validation: Rule => Rule.required()
		},
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
				title: "Summary",
				name: "summary",
				type: "string",
				description:
					"Used when previewing the article, and when shared on social media and google search results"
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		),
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
		),
		localize(
			{
				title: "Credits",
				name: "credits",
				type: "string"
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		)
	],
	preview: {
		select: {
			title: "title"
		},
		prepare: ({ title }) => ({
			title: title[getDefaultLanguage().id],
			subtitle: supportedLanguages
				.filter(lang => !lang.isDefault)
				.map(lang => `${lang.id.toUpperCase()}: ${title[lang.id]}`)
				.join(", ")
		})
	}
};
