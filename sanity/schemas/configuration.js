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
					to: [{ type: "page" }]
				}
			]
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
