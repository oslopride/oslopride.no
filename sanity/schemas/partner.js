import supportedLanguages from "../supported-languages";
import { getDefaultLanguage } from "../utils/locale";
import { MdBusinessCenter } from "react-icons/md";

export default {
	title: "Partner",
	icon: MdBusinessCenter,
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
			name: "type",
			title: "Type",
			type: "string",
			validation: Rule => Rule.required(),
			options: {
				list: [
					{ title: "Eier og arrangør", value: "owner" },
					{ title: "Hovedpartner", value: "main-partner" },
					{ title: "Partner", value: "partner" },
					{ title: "Støttepartner", value: "support-partner" }
				],
				layout: "radio"
			}
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
