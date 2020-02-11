export default {
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
			fieldset: "social",
			validate: Rule => Rule.required()
		},
		{
			title: "Instagram",
			name: "instagram",
			type: "url",
			fieldset: "social",
			validate: Rule => Rule.required()
		},
		{
			title: "Facebook",
			name: "facebook",
			type: "url",
			fieldset: "social",
			validate: Rule => Rule.required()
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
};
