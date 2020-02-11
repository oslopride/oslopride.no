import { localize } from "../../utils/locale";

export default localize("localePageTitle", "string", (lang, Rule) =>
	lang.isDefault ? Rule.required() : undefined
);
