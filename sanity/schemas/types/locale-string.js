import supportedLanguages from "../../supported-languages";

export default {
	name: "locale_string",
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
		type: "string",
		fieldset: lang.isDefault ? null : "translations"
	}))
};
