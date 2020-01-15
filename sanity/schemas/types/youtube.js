export default {
	name: "youtube",
	type: "object",
	title: "YouTube Embed",
	fields: [
		{
			name: "url",
			type: "url",
			title: "YouTube video URL",
			validate: Rule => Rule.required()
		}
	],
	preview: {
		select: {
			url: "url"
		}
	}
};
