import { getDefaultLanguage } from "../utils/locale";

export default {
	title: "Front Page",
	name: "front_page",
	type: "document",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "locale_page_title"
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
			type: "locale_blocks"
		}
	],
	preview: {
		prepare: () => ({ title: "Front Page" })
	}
};
