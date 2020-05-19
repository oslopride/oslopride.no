import { MdEvent } from "react-icons/md";
import { localize } from "../utils/locale";

export default {
	title: "Event",
	name: "simpleEvent",
	icon: MdEvent,
	type: "document",
	initialValue: {
		official: true
	},
	fields: [
		{
			title: "Official Oslo Pride Event",
			name: "official",
			type: "boolean",
			validation: Rule => Rule.required()
		},
		localize(
			{
				name: "title",
				type: "string"
			},
			(lang, Rule) => (lang.isDefault ? Rule.required().max(80) : Rule.max(80))
		),
		{
			title: "Image",
			name: "image",
			type: "image",
			options: {
				hotspot: true
			},
			validation: Rule => Rule.required()
		},
		localize(
			{
				title: "Description",
				name: "description",
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
			(lang, Rule) => (lang.isDefault ? Rule.required() : undefined)
		),
		localize({
			title: "Occurance",
			name: "occurance",
			description: "When does the event occur?",
			type: "string",
			validation: Rule => Rule.required()
		}),
		localize({
			title: "Price",
			name: "price",
			description: "Does the event cost anything?",
			type: "string",
			validation: Rule => Rule.required()
		}),
		{
			title: "Event Link",
			name: "eventLink",
			type: "url",
			validation: Rule => Rule.required()
		},
		localize({
			title: "Organizer",
			name: "organizer",
			type: "string",
			validation: Rule => Rule.required()
		}),
		{
			title: "Contact",
			name: "contact",
			description:
				"Only for internal use (if we need to get in touch with the organizers), not displayed on the website",
			type: "object",
			fields: [
				{
					name: "name",
					type: "string"
				},
				{
					name: "email",
					type: "string"
				}
			]
		}
	]
};
