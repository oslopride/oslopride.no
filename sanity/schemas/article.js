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
			type: "localeArticleTitle"
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
			type: "localePortableText",
			validate: Rule => Rule.required()
		}
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
