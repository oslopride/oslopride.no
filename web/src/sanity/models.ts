/**
 *
 * UTILITIES
 *
 */

export type Language = "no" | "en";
export type Locale<T> = {
	[L in Language]: T;
};

export type SanityObject<T extends string, O extends object> = { _type: T } & O;

export type SanityArray<O extends SanityObject<string, object>> = ({
	_key: string;
} & O)[];

export type SanityReference = SanityObject<"reference", { _ref: string }>;

export type SanityUnknown = SanityObject<string, {}>;

export type SanityDocument<T extends string = string, R = {}> = R & {
	_id: string;
	_rev: string;
	_type: T;
	_createdAt: string;
	_updatedAt: string;
};

export type SanityImage = SanityObject<
	"image",
	{
		asset: SanityReference;
	}
>;

/**
 *
 * TYPES
 *
 */

export type SanityIllustration = SanityObject<
	"illustration",
	{
		asset: SanityReference;
		caption?: string;
		alt?: string;
	}
>;

export type SanityExternalLink = SanityObject<
	"externalLink",
	{
		text: string;
		url: string;
	}
>;
export type SanityInternalLink = SanityObject<
	"internalLink",
	{
		text: string;
		url: SanityPage | SanityFrontPage;
	}
>;

/**
 *
 * BLOCKS
 *
 */

export type SanityCallToActionMinimal = SanityObject<
	"callToActionMinimal",
	{
		title: string;
		headline?: string;
		button?: SanityExternalLink;
	}
>;

export type SanityCallToAction = SanityObject<
	"callToAction",
	{
		title: string;
		headline?: string;
		subheadline?: string;
		button?: SanityExternalLink;
		image?: SanityImage;
	}
>;

export type SanityHero = SanityObject<
	"hero",
	{
		title: string;
		subtitle?: string;
		links?: SanityArray<SanityExternalLink | SanityInternalLink>;
		image?: SanityIllustration;
	}
>;

export type SanityBlock =
	| SanityCallToAction
	| SanityCallToActionMinimal
	| SanityHero;

/**
 *
 * DOCUMENTS
 *
 */

export type SanityPage = SanityDocument<
	"page",
	{
		title: Locale<string>;
		slug: { current: string };
		blocks: SanityObject<"localeBlocks", Locale<SanityArray<SanityBlock>>>;
	}
>;

export type SanityFrontPage = SanityDocument<
	"frontPage",
	{
		blocks: SanityObject<"localeBlocks", Locale<SanityArray<SanityBlock>>>;
	}
>;

export type SanityConfiguration = SanityDocument<
	"configuration",
	{
		navigationBar: (SanityPage | SanityFrontPage)[];
	}
>;
