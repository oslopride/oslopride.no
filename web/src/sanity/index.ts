import sanityClient from "@sanity/client";

export function isEmptyResult(result: object | null): boolean {
	if (result === null) return true;
	return Object.keys(result).length === 0;
}

const sanity = sanityClient({
	projectId: "2ger3rla",
	dataset: "future",
	useCdn: true
});

export default sanity;
