import supportedLanguages from "../supported-languages";

export default {
	title: "Article",
	name: "article",
	type: "document",
	fields: [
		{
			name: "header",
			title: "Header",
			type: "locale_string"
		},
		{
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: "header.en"
			}
		},
		{
			title: "Image",
			name: "image",
			type: "image",
			options: {
				hotspot: true
			}
		},
		{
			title: "Body",
			name: "body",
			type: "locale_portable_text"
		}
	],
	preview: {
		select: {
			header: "header"
		},
		prepare: ({ header }) => ({
			title: header[(supportedLanguages.find(lang => lang.isDefault) || {}).id],
			subtitle: supportedLanguages
				.filter(lang => !lang.isDefault)
				.map(lang => `${lang.id.toUpperCase()}: ${header[lang.id]}`)
				.join(", ")
		})
	}
};
