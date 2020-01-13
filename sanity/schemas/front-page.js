export default {
	title: "Front Page",
	name: "front_page",
	type: "document",
	fields: [
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
