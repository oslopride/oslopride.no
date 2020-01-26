export default {
	title: "Key Value Pair",
	name: "keyValuePair",
	type: "object",
	fields: [
		{
			title: "Key",
			name: "key",
			type: "string",
			validate: Rule => Rule.required()
		},
		{
			title: "Value",
			name: "value",
			type: "string"
		}
	],
	preview: {
		select: {
			title: "key"
		}
	}
};
