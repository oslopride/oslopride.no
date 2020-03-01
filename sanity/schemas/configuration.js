export default {
	title: "Configuration",
	name: "configuration",
	type: "document",
	fields: [
		{
			title: "Date",
			name: "date",
			type: "string",
			validate: Rule => Rule.required()
		},
		{
			title: "Navigation Bar",
			name: "navigationBar",
			type: "array",
			of: [{ type: "internalLink" }]
		},
		{
			title: "Footer",
			name: "footer",
			type: "object",
			options: { collapsible: true, collapsed: false },
			fieldsets: [
				{ name: "social", title: "Social media links" },
				{ name: "links", title: "Shortcuts" }
			],
			fields: [
				{
					title: "Twitter",
					name: "twitter",
					type: "url",
					fieldset: "social"
				},
				{
					title: "Instagram",
					name: "instagram",
					type: "url",
					fieldset: "social"
				},
				{
					title: "Facebook",
					name: "facebook",
					type: "url",
					fieldset: "social"
				},
				{
					title: "Links",
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
