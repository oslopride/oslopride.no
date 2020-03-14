export default {
	title: "Partner Preview",
	name: "partnerPreview",
	type: "object",
	fields: [
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
