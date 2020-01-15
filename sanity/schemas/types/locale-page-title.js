import { localize } from "../../utils/locale";

export default localize("locale_page_title", "string", (lang, Rule) =>
	lang.isDefault ? Rule.required() : undefined
);
