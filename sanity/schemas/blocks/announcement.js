import internalLink from "../types/internal-link";

export default {
	title: "Announcement",
	name: "announcement",
	type: "object",
	fields: [
		{
			title: "Category",
			name: "category",
			type: "string"
		},
		{
			title: "Title",
			name: "title",
			type: "string"
		},
		{
			title: "Link",
			name: "link",
			type: internalLink.name
		}
	],
	preview: {
		select: {
			title: "title"
		},
		prepare(selection) {
			const { title } = selection;
			return {
				title: "Announcement",
				subtitle: title
			};
		}
	}
};
