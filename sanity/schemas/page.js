import supportedLanguages from "../supported-languages";

export default {
	title: "Page",
	name: "page",
	type: "document",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "localeString"
		},
		{
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: "title.en"
			}
		},
		{
			title: "Blocks",
			name: "blocks",
			type: "localeBlocks"
		}
	],
	preview: {
		select: {
			title: "title"
		},
		prepare: ({ title }) => ({
			title: title[(supportedLanguages.find(lang => lang.isDefault) || {}).id],
			subtitle: supportedLanguages
				.filter(lang => !lang.isDefault)
				.map(lang => `${lang.id.toUpperCase()}: ${title[lang.id]}`)
				.join(", ")
		})
	}
};
