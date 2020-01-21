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
			title: "Subtitle", // in sanity
			name: "subtitle", // json
			type: "string"
		},
		{
			title: "Link", // in sanity
			name: "link", // json
			type: "internal_link" // taken from sanity/schemas/types
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
