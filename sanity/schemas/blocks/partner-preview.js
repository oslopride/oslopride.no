export default {
	title: "Partner Preview",
	name: "partnerPreview",
	type: "object",
	fields: [
		{
			title: "Heading",
			name: "heading",
			type: "string"
		},
		{
			title: "Subheading",
			name: "subHeading",
			type: "string"
		},
		{
			type: "array",
			name: "partners",
			of: [
				{
					type: "reference",
					to: { type: "partner" }
				}
			]
		}
	],
	preview: {
		prepare() {
			return {
				title: "Partner preview"
			};
		}
	}
};
