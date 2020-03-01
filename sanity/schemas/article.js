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
			validate: Rule => Rule.required()
		},
		{
			title: "Image",
			name: "image",
			type: "image",
			options: {
				hotspot: true
			},
			validate: Rule => Rule.required()
		},
		localize(
			{
				title: "Body",
				name: "body",
				type: "array",
				of: [{ type: "block" }]
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
