import { getDefaultLanguage } from "../utils/locale";

export default {
	title: "Front Page",
	name: "frontPage",
	type: "document",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "localePageTitle"
		},
		{
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: `title.${getDefaultLanguage().id}`
			}
		},
		{
			title: "Blocks",
			name: "blocks",
			type: "localeBlocks"
		}
	],
	preview: {
		prepare: () => ({ title: "Front Page" })
	}
};
