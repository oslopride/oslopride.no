import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const previewMode = process.env.SANITY_PREVIEW === "true";
if (previewMode) {
	console.warn("YOU ARE IN PREVIEW MODE");
}

export function isEmptyResult(result: object | null): boolean {
	if (result === null) return true;
	return Object.keys(result).length === 0;
}

export const PROJECT_ID = "2ger3rla";
export const DATASET = process.env.SANITY_STUDIO_API_DATASET || "development";

const sanity = sanityClient({
	projectId: PROJECT_ID,
	dataset: DATASET,
	useCdn: !previewMode,
	withCredentials: previewMode
});

const builder = imageUrlBuilder(sanity);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export default sanity;
