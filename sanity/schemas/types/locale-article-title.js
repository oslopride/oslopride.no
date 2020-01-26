import { localize } from "../../utils/locale";

export default localize("localeArticleTitle", "string", (lang, Rule) =>
	lang.isDefault ? Rule.required() : undefined
);
