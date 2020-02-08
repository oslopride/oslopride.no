export default {
	title: "Call to action minimal",
	name: "callToActionMinimal",
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
			title: "Button",
			name: "button",
			type: "externalLink"
		}
	],
	preview: {
		select: {
			title: "title",
			subtitle: "headline"
		},
		prepare(selection) {
			const { title, subtitle } = selection;
			return {
				title: "Call To Action: " + title,
				subtitle
			};
		}
	}
};
