import sanityClient from "@sanity/client";
import { Locale } from "./utils";

const client = sanityClient({
	projectId: "2ger3rla",
	dataset: "future",
	useCdn: true
});

function isEmptyResult(result: object | null): boolean {
	if (result === null) return true;
	return Object.keys(result).length === 0;
}

type SanityDocument<T extends string = string, R = {}> = R & {
	_id: string;
	_rev: string;
	_type: T;
	_createdAt: string;
	_updatedAt: string;
};

type SanityPage = SanityDocument<
	"page",
	{
		title: Locale<string>;
		slug: { current: string };
		blocks: object[];
	}
>;

type SanityFrontPage = SanityDocument<
	"frontPage",
	{
		blocks: object[];
	}
>;

type SanityConfiguration = SanityDocument<
	"configuration",
	{
		navigationBar: (SanityPage | SanityFrontPage)[];
	}
>;

export const api = {
	getConfiguration: async (): Promise<SanityConfiguration | null> => {
		const query = `*[_id == "global_configuration"][0]{..., navigationBar[]->}`;
		const result = await client.fetch<SanityConfiguration>(query);
		if (isEmptyResult(result)) return null;
		return result;
	},
	getFrontPage: async (): Promise<SanityFrontPage | null> => {
		const query = `*[_id == "global_frontPage"][0]`;
		const result = await client.fetch<SanityFrontPage>(query);
		if (isEmptyResult(result)) return null;
		return result;
	},
	getPageById: async (id: string): Promise<SanityPage | null> => {
		const query = `*[_type == "page" && _id == $id]`;
		const result = await client.fetch<SanityPage>(query, { id });
		if (isEmptyResult(result)) return null;
		return result;
	},
	getPageBySlug: async (slug: string): Promise<SanityPage | null> => {
		const query = `*[_type == "page" && slug.current == $slug][0]`;
		const result = await client.fetch<SanityPage>(query, { slug });
		if (isEmptyResult(result)) return null;
		return result;
	}
};
