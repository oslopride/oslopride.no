import { MdEvent } from "react-icons/md";
import { getDefaultLanguage, localize } from "../utils/locale";

export default {
	title: "Event",
	name: "simpleEvent",
	icon: MdEvent,
	type: "document",
	initialValue: {
		official: true,
		signLanguageInterpreted: false,
		simultaneousTexting: false,
		inductionLoop: false,
		wheelchairFriendly: false,
		liveStream: false,
		english: false
	},
	fieldsets: [
		{
			name: "accessibility",
			title: "Accessibility",
			options: { collapsible: true, collapsed: false }
		},
		{
			name: "time",
			title: "Time",
			options: { collapsible: true, collapsed: false }
		},
		{
			name: "location",
			title: "Location",
			options: { collapsible: true, collapsed: false }
		}
	],
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
			title: "URL",
			name: "slug",
			type: "slug",
			options: {
				source: "title.en.id"
			},
			validation: Rule => Rule.required()
		},
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
						lists: [
							{ title: "Bullet", value: "bullet" },
							{ title: "Numbered", value: "number" }
						],
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
							.min(5)
							.max(280)
					: Rule.min(5).max(280)
		),
		{
			title: "Start time",
			name: "startTime",
			description: "When does the event begin?",
			fieldset: "time",
			type: "datetime",
			validation: Rule => Rule.required()
		},
		{
			title: "End time",
			name: "endTime",
			description: "When does the event end?",
			fieldset: "time",
			type: "datetime",
			validation: Rule => Rule.required()
		},
		{
			name: "category",
			type: "string",
			options: {
				list: [
					{ title: "Concert", value: "concert" },
					{ title: "Debate", value: "debate" },
					{ title: "Talk", value: "talk" },
					{ title: "Lecture", value: "lecture" },
					{ title: "Litteratur", value: "literature" },
					{ title: "Workshop", value: "workshop" },
					{ title: "Party", value: "party" },
					{ title: "Dans", value: "dans" },
					{ title: "Performance", value: "performance" },
					{ title: "Teater", value: "teater" },
					{ title: "Kino", value: "cinema" },
					{ title: "Drag", value: "drag" },
					{ title: "Activity for children", value: "children" },
					{ title: "Other", value: "other" }
				]
			},
			validation: Rule => Rule.required()
		},
		{
			name: "arena",
			type: "string",
			options: {
				list: [
					{ title: "Pride Park", value: "park" },
					{ title: "Pride House", value: "house" },
					{ title: "Pride Parade", value: "parade" },
					{ title: "Mini Pride", value: "minipride" },
					{ title: "Salt", value: "salt" },
					{ title: "External", value: "external" },
					{ title: "Other", value: "other" },
					{ title: "Pride square", value: "square" },
					{ title: "Skeive Scener", value: "scener" }
				]
			},
			fieldset: "location",
			validation: Rule => Rule.required()
		},
		{
			name: "venue",
			type: "string",
			options: {
				list: [
					{ title: "Hovedscenen", value: "stage1" },
					{ title: "Bamsescenen", value: "stage2" },
					{ title: "Kulturscenen", value: "kultur" },
					{ title: "Eyr", value: "eyr" },
					{ title: "Hippokrates", value: "hippo" },
					{ title: "Bjerget", value: "bjerget" },
					{ title: "Isachsen", value: "isachsen" },
					{ title: "Schjelderup", value: "schjelderup" },
					{ title: "Mini Pride", value: "minipride" },
					{ title: "Pride Box", value: "box" },
					{ title: "Loud ‘n’ Proud", value: "loudproud" },
					{ title: "Online", value: "online" },
					{ title: "Youngs", value: "youngs" },
					{ title: "Skeive Scener", value: "scener" }
				]
			},
			fieldset: "location"
		},
		{
			name: "address",
			type: "string",
			fieldset: "location"
		},
		{
			name: "signLanguageInterpreted",
			type: "boolean",
			fieldset: "accessibility",
			validation: Rule => Rule.required()
		},
		{
			name: "simultaneousTexting",
			type: "boolean",
			fieldset: "accessibility",
			validation: Rule => Rule.required()
		},
		{
			name: "inductionLoop",
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
			name: "liveStream",
			description:
				"This indicates that the event will be streamed on the official Oslo Pride live stream",
			type: "boolean",
			fieldset: "accessibility",
			validation: Rule => Rule.required()
		},
		{
			name: "english",
			type: "boolean",
			fieldset: "accessibility",
			validation: Rule => Rule.required()
		},
		{
			name: "alcoholFree",
			type: "boolean",
			fieldset: "accessibility",
			validation: Rule => Rule.required()
		},
		{
			name: "eventLink",
			description: "URL to the event website (e.g. facebook, youtube etc)",
			type: "url"
		},
		{
			name: "organizer",
			type: "string",
			validation: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			title: "title",
			image: "image",
			startTime: "startTime"
		},
		prepare: ({ title, image, startTime }) => ({
			title: title[getDefaultLanguage().id],
			subtitle: new Date(startTime).toLocaleString(),
			media: image
		})
	},
	orderings: [
		{
			title: "Start time",
			name: "startTime",
			by: [{ field: "startTime", direction: "asc" }]
		}
	]
};
