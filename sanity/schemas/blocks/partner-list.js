import partner from "../partner";

export default {
	title: "Partner List",
	name: "partnerList",
	type: "object",
	fields: [
		{
			type: "string",
			name: "title"
		},
		{
			type: "array",
			name: "partnerList",
			of: [
				{
					type: "reference",
					to: { type: partner.name }
				}
			]
		}
	],
	preview: {
		select: {
			previewTitle: "title"
		},
		prepare(selection) {
			const { previewTitle } = selection;
			return {
				title: "Partner List",
				subtitle: previewTitle
			};
		}
	}
};
