import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
	SanityClient,
	SanityImageSource
} from "@sanity/image-url/lib/types/types";

export function isEmptyResult(result: object | null): boolean {
	if (result === null) return true;
	return Object.keys(result).length === 0;
}

const sanity = sanityClient({
	projectId: "2ger3rla",
	dataset: "future",
	useCdn: true
});

const builder = imageUrlBuilder(sanity as SanityClient);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export default sanity;
