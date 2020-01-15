import supportedLanguages from "../supported-languages";
import { getDefaultLanguage } from "../utils/locale";

export default {
	title: "Page",
	name: "page",
	type: "document",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "locale_page_title"
		},
		{
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: `title.${getDefaultLanguage().id}`
			}
		},
		{
			title: "Blocks",
			name: "blocks",
			type: "locale_blocks"
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
