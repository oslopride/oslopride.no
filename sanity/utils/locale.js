import supportedLanguages from "../supported-languages";

export function localize(field, validations) {
	const { name, title, ...rest } = field;
	return {
		title,
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
			fieldset: lang.isDefault ? null : "translations",
			validation: validations && (Rule => validations(lang, Rule) || []),
			...rest
		}))
	};
}

export function getDefaultLanguage() {
	return supportedLanguages.find(lang => lang.isDefault);
}
