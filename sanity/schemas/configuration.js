export default {
	title: "Configuration",
	name: "configuration",
	type: "document",
	fields: [
		{
			title: "Navigation Bar",
			name: "navigation_bar",
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
					type: "key_value_pair"
				}
			]
		}
	]
};
