export default {
	name: "webConfiguration",
	type: "document",
	fields: [
		{
			name: "date",
			type: "string",
			validate: Rule => Rule.required()
		},
		{
			name: "navigationBar",
			type: "array",
			of: [{ type: "internalLink" }]
		},
		{
			name: "footer",
			type: "object",
			options: { collapsible: true, collapsed: false },
			fieldsets: [
				{ name: "social", title: "Social media links" },
				{ name: "links", title: "Shortcuts" }
			],
			fields: [
				{
					name: "twitter",
					type: "url",
					fieldset: "social"
				},
				{
					name: "instagram",
					type: "url",
					fieldset: "social"
				},
				{
					name: "facebook",
					type: "url",
					fieldset: "social"
				},
				{
					name: "links",
					fieldset: "links",
					type: "array",
					of: [
						{
							type: "externalLink"
						}
					]
				}
			]
		},
		{
			title: "Advanced",
			name: "advanced",
			type: "array",
			of: [
				{
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
				}
			]
		}
	]
};
