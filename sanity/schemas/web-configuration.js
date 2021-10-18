export default {
	name: "webConfiguration",
	type: "document",
	fields: [
		{
			name: "date",
			type: "string",
			validation: Rule => Rule.required()
		},
		{
			name: "navigationBar",
			type: "array",
			of: [{ type: "internalLink" }, { type: "externalLink" }]
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
						},
						{
							type: "internalLink"
						}
					]
				}
			]
		},
		{
			title: "Redirects",
			name: "redirects",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							title: "From",
							name: "from",
							type: "string",
							validation: Rule => Rule.required()
						},
						{
							title: "To",
							name: "to",
							type: "string",
							validation: Rule => Rule.required()
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
							validation: Rule => Rule.required()
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
