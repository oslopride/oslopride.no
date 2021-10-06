import { MdBusinessCenter } from "react-icons/md";

export default {
	title: "Partner",
	icon: MdBusinessCenter,
	name: "partner",
	type: "document",
	fields: [
		{
			name: "heroImage",
			title: "Hero image",
			type: "image",
			options: {
				hotspot: false
			}
		},
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: Rule => Rule.required()
		},
		{
			name: "type",
			title: "Partner type",
			type: "string",
			options: { list: ["owner", "main", "regular", "supporter", "allied"] }
		},
		{
			name: "description",
			title: "Description",
			type: "array",
			of: [{ type: "block", styles: [], lists: [] }],
			validation: Rule => Rule.required()
		},

		{
			name: "content",
			title: "Content",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Heading", value: "h3" },
						{ title: "Subheading", value: "h4" }
					]
				},
				{
					type: "image",
					options: { hotspot: true }
				},
				{ type: "youtube" }
			]
		},
		{
			name: "url",
			title: "Partner's website",
			type: "url",
			validation: Rule => Rule.required()
		},
		{
			name: "image",
			title: "Logo",
			type: "image",
			options: {
				hotspot: false
			},
			validation: Rule => Rule.required()
		},
		{
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: "name"
			},
			validation: Rule => Rule.required()
		},
		{
			title: "Facebook social link",
			name: "facebookLink",
			type: "url",
			description: "Format: 'https://www.example.com'",
			validation: Rule =>
				Rule.uri({
					scheme: ["http", "https"]
				})
		},
		{
			title: "Instagram social link",
			name: "instagramLink",
			type: "url",
			description: "Format: 'https://www.example.com'",
			validation: Rule =>
				Rule.uri({
					scheme: ["http", "https"]
				})
		},
		{
			title: "LinkedIn social link",
			name: "linkedinLink",
			type: "url",
			description: "Format: 'https://www.example.com'",
			validation: Rule =>
				Rule.uri({
					scheme: ["http", "https"]
				})
		}
	],
	preview: {
		select: {
			title: "name"
		}
	}
};
