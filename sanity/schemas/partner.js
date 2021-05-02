import { MdBusinessCenter } from "react-icons/md";

export default {
	title: "Partner",
	icon: MdBusinessCenter,
	name: "partner",
	type: "document",
	fields: [
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
			of: [{ type: "block" }],
			validation: Rule => Rule.required()
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
		}
	],
	preview: {
		select: {
			title: "name"
		}
	}
};
