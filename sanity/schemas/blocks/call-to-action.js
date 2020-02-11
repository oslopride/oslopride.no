export default {
	title: "Call to action", // title in sanity
	name: "callToAction",
	type: "object",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string"
		},
		{
			title: "Headline",
			name: "headline",
			type: "string"
		},
		{
			title: "Subheadline",
			name: "subheadline",
			type: "string"
		},
		{
			title: "Button", // in sanity
			name: "button", // json
			type: "externalLink" // taken from sanity/schemas/types
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
			type: "string"
		}
	]
};
