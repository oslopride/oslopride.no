type Languages = "no" | "en";
export type Locale<T> = {
	[L in Languages]: T;
};

type SanityDocument<T extends string = string, R = {}> = R & {
	_id: string;
	_rev: string;
	_type: T;
	_createdAt: string;
	_updatedAt: string;
};

export type SanityPage = SanityDocument<
	"page",
	{
		title: Locale<string>;
		slug: { current: string };
		blocks: object[];
	}
>;

export type SanityFrontPage = SanityDocument<
	"frontPage",
	{
		blocks: object[];
	}
>;

export type SanityConfiguration = SanityDocument<
	"configuration",
	{
		navigationBar: (SanityPage | SanityFrontPage)[];
	}
>;
