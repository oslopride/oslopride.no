import React from "react";
import Hero from "@oslopride/web/src/blocks/hero";

export default {
	title: "Hero",
	name: "hero",
	type: "object",
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string"
		},
		{
			title: "Subtitle",
			name: "subtitle",
			type: "string"
		},
		{
			title: "Links",
			name: "links",
			type: "array",
			of: [{ type: "internal_link" }, { type: "external_link" }]
		},
		{
			title: "Image",
			name: "image",
			type: "illustration"
		}
	],
	preview: {
		select: {
			title: "title",
			subtitle: "subtitle",
			links: "links",
			image: "image"
		},
		component: ({ value }) => <Hero {...value} />
	}
};
