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
		{
			title: "Start time",
			name: "startTime",
			description: "When does the event begin?",
			type: "datetime",
			validation: Rule => Rule.required()
		},
		{
			title: "End time",
			name: "endTime",
			description: "When does the event end?",
			type: "datetime",
			validation: Rule => Rule.required()
		},
		{
			title: "Price",
			name: "price",
			description: "Does the event cost anything?",
			type: "string"
		},
		{
			title: "Event Link",
			name: "eventLink",
			type: "url",
			validation: Rule => Rule.required()
		},
		{
			title: "Organizer",
			name: "organizer",
			type: "string"
		},
		{
			title: "Contact",
			name: "contact",
			description: "For internal use, but will be publicly accessible",
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
		},
		{
			name: "documentOwner",
			type: "string",
			hidden: true
		}
	]
};
