export default {
	title: "Front Page",
	name: "frontPage",
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
