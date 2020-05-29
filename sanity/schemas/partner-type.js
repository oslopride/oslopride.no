import { MdBusinessCenter } from "react-icons/md";
import { localize, getDefaultLanguage } from "../utils/locale";
import supportedLanguages from "../supported-languages";

export default {
	name: "partnerType",
	type: "document",
	icon: MdBusinessCenter,
	fields: [
		localize(
			{
				name: "name",
				type: "string"
			},
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		),
		{
			name: "ordinal",
			type: "number"
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
