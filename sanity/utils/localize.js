import supportedLanguages from "../supported-languages";

export default function localize(name, type, validations) {
	return {
		name,
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
			type,
			fieldset: lang.isDefault ? null : "translations",
			validation: validations && (Rule => validations(lang, Rule))
		}))
	};
}
