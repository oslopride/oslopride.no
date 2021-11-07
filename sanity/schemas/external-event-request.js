export default {
	name: "externalEventRequest",
	title: "External event request",
	type: "document",
	liveEdit: true,
	__experimental_actions: [/* 'create', */ "update", /* 'delete', */ "publish"],
	fields: [
		{
			name: "eventName",
			title: "Event name",
			description: "The name of this event",
			type: "string"
		},
		{
			name: "eventDescription",
			title: "Event description",
			description: "The description of the event",
			type: "string"
		},
		{
			name: "eventDate",
			title: "Event date",
			description: "The date that this event will happen",
			type: "datetime"
		},
		{
			name: "eventEmail",
			title: "Coordinator email",
			description: "The coordinator's email",
			type: "string"
		},
		{
			name: "approved",
			title: "Er denne forespørselen allerede godkjent",
			type: "boolean"
		}
	]
};
