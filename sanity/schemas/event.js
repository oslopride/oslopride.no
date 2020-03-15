import { isBefore, differenceInHours, format } from "date-fns";
import { MdEvent } from "react-icons/md";
import { localize } from "../utils/locale";

export default {
	title: "Event",
	name: "event",
	icon: MdEvent,
	type: "document",
	initialValue: {
		official: true,
		status: "approved",
		free: true,
		signLanguageInterpreted: false,
		wheelchairFriendly: false,
		ageLimit: "0"
	},
	fieldsets: [
		{
			name: "accessibility",
			title: "Accessibility",
			options: { collapsible: true, collapsed: false }
		},
		{
			name: "entranceFee",
			title: "Entrance Fee",
			options: { collapsible: true, collapsed: true }
		}
	],
	fields: [
		{
			title: "Official Oslo Pride Event",
			name: "official",
			type: "boolean",
			validation: Rule => Rule.required()
		},
		{
			name: "status",
			type: "string",
			options: {
				list: [
					{ title: "Awaiting approval", value: "review" },
					{ title: "Approved", value: "approved" },
					{ title: "Published", value: "published" },
					{ title: "Rejected", value: "rejected" }
				],
				layout: "radio",
				direction: "horizontal"
			},
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
				title: "Blurb",
				description:
					"Short description used by previews, in search results and when sharing on social media",
				name: "blurb",
				type: "string"
			},
			(lang, Rule) =>
				lang.isDefault
					? Rule.required()
							.min(10)
							.max(280)
					: Rule.min(10).max(280)
		),
		localize(
			{
				title: "Description",
				name: "description",
				type: "array",
				of: [
					{
						type: "block",
						styles: [
							{ title: "Heading", value: "h3" },
							{ title: "Subheading", value: "h4" },
							{ title: "Normal", value: "normal" }
						],
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
			name: "category",
			type: "string",
			options: {
				list: [
					{ title: "Concert", value: "concert" },
					{ title: "Debate", value: "debate" },
					{ title: "Exhibition", value: "exhibition" },
					{ title: "Party", value: "party" },
					{ title: "Other", value: "other" }
				]
			},
			validation: Rule => Rule.required()
		},
		{
			title: "Occurances",
			name: "occurances",
			type: "array",
			options: {
				collapsible: true
			},
			of: [
				{
					type: "object",
					fields: [
						{
							name: "start",
							type: "datetime",
							validation: Rule => Rule.required()
						},
						{
							name: "end",
							type: "datetime",
							validation: Rule => Rule.required()
						}
					],
					validation: Rule =>
						Rule.custom(occurance => {
							const { start, end } = occurance;

							if (isBefore(end, start)) {
								return "Cannot end before it starts";
							}

							if (differenceInHours(end, start) > 20) {
								return "Occurances cannot last more than 20 hours";
							}

							return true;
						}),
					preview: {
						select: {
							start: "start",
							end: "end"
						},
						prepare: ({ start, end }) => ({
							title: format(start, "dddd MMMM Do YYYY"),
							subtitle: `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`
						})
					}
				}
			],
			validation: Rule => Rule.required().min(1)
		},
		{
			name: "location",
			type: "object",
			fields: [
				{
					name: "arena",
					type: "reference",
					to: { type: "arena" }
				},
				{
					name: "venue",
					type: "reference",
					to: { type: "venue" }
				},
				{
					name: "address",
					type: "string"
				}
			],
			validation: Rule =>
				Rule.required().custom(location => {
					const { arena, venue, address } = location;

					if (!arena && !venue && !address) {
						return "Address must be provided when no arena or venue are given";
					}

					return true;
				})
		},
		{
			title: "No Entrance Fee",
			name: "free",
			fieldset: "entranceFee",
			type: "boolean",
			validation: Rule => Rule.required()
		},
		{
			name: "prices",
			fieldset: "entranceFee",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							title: "Amount",
							name: "amount",
							type: "number",
							validation: Rule => Rule.required()
						},
						localize(
							{
								title: "Description",
								name: "description",
								type: "string"
							},
							(lang, Rule) =>
								lang.isDefault
									? Rule.required()
											.min(1)
											.max(20)
									: Rule.min(1).max(20)
						)
					]
				}
			]
		},
		{
			title: "Link to ticket sales",
			name: "ticketSalesUrl",
			fieldset: "entranceFee",
			type: "url"
		},
		{
			name: "ageLimit",
			type: "string",
			options: {
				list: [
					{ title: "No age limit", value: "0" },
					{ title: "18 years", value: "18" },
					{ title: "19 years", value: "19" },
					{ title: "20 years", value: "20" },
					{ title: "21 years", value: "21" },
					{ title: "22 years", value: "22" },
					{ title: "23 years", value: "23" },
					{ title: "24 years", value: "24" },
					{ title: "25 years", value: "25" },
					{ title: "26 years", value: "26" },
					{ title: "Other", value: "99" }
				]
			},
			validation: Rule => Rule.required()
		},
		{
			name: "signLanguageInterpreted",
			type: "boolean",
			fieldset: "accessibility",
			validation: Rule => Rule.required()
		},
		{
			name: "wheelchairFriendly",
			type: "boolean",
			fieldset: "accessibility",
			validation: Rule => Rule.required()
		},
		{
			name: "eventWebsite",
			description: "URL to the event website, usually facebook",
			type: "url"
		},
		{
			name: "organizer",
			type: "string",
			validation: Rule => Rule.required()
		},
		{
			name: "contact",
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
