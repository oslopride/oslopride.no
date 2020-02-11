import supportedLanguages from "../supported-languages";
import { getDefaultLanguage } from "../utils/locale";

export default {
	title: "Partner",
	name: "partner",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: Rule => Rule.required()
		},
		{
			name: "description",
			title: "Description",
			type: "array",
			of: [{ type: "block" }],
			validation: Rule => Rule.required()
		},
		{
			name: "url",
			title: "Partner's website",
			type: "url",
			validation: Rule => Rule.required()
		},
		{
			name: "image",
			title: "Logo",
			type: "image",
			options: {
				hotspot: false
			},
			validation: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			title: "name"
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
