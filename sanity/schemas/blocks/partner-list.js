import partner from "../partner";

export default {
	title: "Partner List", // the title shown in sanity
	name: "partnerList", // the title to use in web
	type: "object", // documentation regarding type https://www.sanity.io/docs/object-type
	fields: [
		{
			type: "string",
			name: "title"
		},
		{
			type: "array", // documentation regarding type https://www.sanity.io/docs/array-type
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
			previewTitle: "title" // "title", comes from fields.name
		},
		prepare(selection) {
			// { subtitle: "some string", media: {nwalfna} }
			const { previewTitle } = selection;
			return {
				title: "Partner List",
				subtitle: previewTitle
			};
		}
	}
};
