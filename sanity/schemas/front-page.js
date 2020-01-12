export default {
	title: "Front Page",
	name: "front_page",
	type: "document",
	fields: [
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
