import supportedLanguages from "../../supported-languages";

export default {
	name: "locale_portable_text",
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
		type: "portable_text",
		fieldset: lang.isDefault ? null : "translations"
	}))
};
