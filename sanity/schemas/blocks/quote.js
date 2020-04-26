import { localize, getDefaultLanguage } from "../../utils/locale";
import supportedLanguages from "../../supported-languages";

export default {
	title: "Quote",
	name: "quote",
	type: "object",
	fields: [
		localize(
			{
				title: "Content",
				name: "content",
				type: "string"
			},
			(lang, Rule) => lang.isDefault && Rule.required()
		),
		{
			title: "Citation source",
			name: "citation",
			type: "string"
		}
	],
	preview: {
		select: {
			title: "content"
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
