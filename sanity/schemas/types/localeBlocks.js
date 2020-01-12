import supportedLanguages from "../../supported-languages";

export default {
	name: "localeBlocks",
	type: "object",
	fieldsets: [
		{
			title: "Translations",
			name: "translations",
			options: { collapsible: true }
		}
	],
	fields: supportedLanguages.map(lang => ({
		title: lang.title,
		name: lang.id,
		type: "blocks",
		fieldset: lang.isDefault ? null : "translations"
	}))
};
