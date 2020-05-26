import internalLink from "../types/internal-link";
import externalLink from "../types/external-link";

export default {
	title: "Advertisement",
	name: "advertisement",
	type: "object",
	fields: [
		{
			title: "Category",
			name: "category",
			type: "string"
		},
		{
			title: "Title",
			name: "title",
			type: "string"
		},
		{
			title: "Content",
			name: "content",
			type: "array",
			of: [
				{
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
					marks: {
						decorators: [
							{ title: "Strong", value: "strong" },
							{ title: "Emphasis", value: "em" }
						]
					}
				}
			]
		},
		{
			title: "Links",
			name: "links",
			type: "array",
			of: [{ type: internalLink.name }, { type: externalLink.name }]
		},
		{
			title: "Image",
			name: "image",
			type: "image",
			options: {
				hotspot: true
			}
		},
		{
			title: "Color",
			name: "color",
			type: "string",
			hidden: true
		}
	],
	preview: {
		select: {
			title: "title"
		},
		prepare(selection) {
			const { title } = selection;
			return {
				title: "Advertisement",
				subtitle: title
			};
		}
	}
};
