import supportedLanguages from "../supported-languages";
import { getDefaultLanguage } from "../utils/locale";

export default {
	title: "Article",
	name: "article",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "locale_article_title"
		},
		{
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: `title.${getDefaultLanguage().id}`
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
		{
			title: "Body",
			name: "body",
			type: "locale_portable_text",
			validate: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			header: "header"
		},
		prepare: ({ header }) => ({
			title: header[getDefaultLanguage().id],
			subtitle: supportedLanguages
				.filter(lang => !lang.isDefault)
				.map(lang => `${lang.id.toUpperCase()}: ${header[lang.id]}`)
				.join(", ")
		})
	}
};
