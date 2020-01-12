import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({
	projectId: "2ger3rla",
	dataset: "future"
});

export function urlFor(source) {
	return builder.image(source);
}
