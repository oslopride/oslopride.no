import { localize } from "../utils/locale";

export default {
	title: "New article",
	name: "newArticle",
	type: "document",
	fields: [
		{
			title: "Article title",
			name: "articleTitle",
			type: "string"
		},
		{
			title: "Article Content",
			name: "articleContent",
			type: "array",
			of: [
				localize(
					{
						title: "Body",
						name: "body",
						type: "array",
						of: [
							{ type: "block" },
							{
								type: "image",
								options: { hotspot: true }
							},
							{ type: "youtube" },
							{ type: "iframe" }
						]
					},
					(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
				),
				{
					title: "Quotes",
					name: "quotes",
					type: "object",
					fields: [
						{
							title: "Quote text",
							name: "quoteText",
							type: "string"
						}
					]
				}
			]
		}
	]
};
