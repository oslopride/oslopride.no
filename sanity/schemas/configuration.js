export default {
	title: "Configuration",
	name: "configuration",
	type: "document",
	fields: [
		{
			title: "Navigation Bar",
			name: "navigationBar",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "page" }, { type: "frontPage" }]
				}
			]
		},
		{
			title: "Date",
			name: "date",
			type: "string"
		},
		{
			title: "Footer",
			name: "footer",
			type: "footer"
		},
		{
			title: "Advanced",
			name: "advanced",
			type: "array",
			of: [
				{
					type: "keyValuePair"
				}
			]
		}
	]
};
