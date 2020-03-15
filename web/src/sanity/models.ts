/**
 *
 * UTILITIES
 *
 */

export type SupportedLanguages = "en";
export type DefaultLagnguage = "no";
export type Locale<T> = { [L in DefaultLagnguage]: T } &
	{
		[L in SupportedLanguages]: T | undefined;
	};

export type SanityObject<T extends string, O extends object> = { _type: T } & O;

// NB: Only use this when all elements within the array are sanity object (i.e.
// not docuements, arrays ect)
export type SanityObjectArray<O extends SanityObject<string, object>> = ({
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

export type SanityBlockContent = SanityObject<"block", object>;

/**
 *
 * TYPES
 *
 */

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
		url: SanityReference;
	}
>;

export type SanityPageHeader = Locale<{
	title: string;
	subtitle: string;
	links?: SanityObjectArray<SanityInternalLink | SanityExternalLink>;
	image: SanityImage;
}>;

/**
 *
 * BLOCKS
 *
 */

export type SanityAnnouncement = SanityObject<
	"announcement",
	{
		category?: string;
		title: string;
		link?: SanityInternalLink | SanityExternalLink;
	}
>;

export type SanityAdvertisement = SanityObject<
	"advertisement",
	{
		category?: string;
		title: string;
		content?: SanityObjectArray<SanityBlockContent>;
		links?: SanityObjectArray<SanityInternalLink>;
		image?: SanityImage;
	}
>;

export type SanityTextArea = SanityObject<
	"textArea",
	{
		text: SanityObjectArray<SanityBlockContent>;
	}
>;

export type SanityCollapsibleListItem = SanityObject<
	"listItem",
	{
		title: string;
		content: SanityObjectArray<SanityBlockContent>;
	}
>;

export type SanityCollapsibleList = SanityObject<
	"collapsibleList",
	{
		title: string;
		listItems: SanityObjectArray<SanityCollapsibleListItem>;
	}
>;

export type SanityPartnerPreview = SanityObject<
	"partnerPreview",
	{
		heading: string;
		subHeading: string;
		partners: SanityObjectArray<SanityReference>;
	}
>;

export type SanityBlock =
	| SanityAnnouncement
	| SanityAdvertisement
	| SanityTextArea
	| SanityCollapsibleList
	| SanityPartnerPreview;

/**
 *
 * DOCUMENTS
 *
 */

export type SanityFrontPage = SanityDocument<
	"frontPage",
	{
		header: SanityPageHeader;
		blocks: SanityObject<
			"localeBlocks",
			Locale<SanityObjectArray<SanityBlock>>
		>;
	}
>;

export type SanityPage = SanityDocument<
	"page",
	{
		slug: { current: string };
		header: SanityPageHeader;
		blocks: SanityObject<
			"localeBlocks",
			Locale<SanityObjectArray<SanityBlock>>
		>;
	}
>;

export type SanityPartner = SanityDocument<
	"partner",
	{
		name: string;
		type: SanityReference;
		description: SanityBlockContent;
		url: string;
		image: SanityImage;
	}
>;

export type SanityConfiguration = SanityDocument<
	"configuration",
	{
		date: string;
		navigationBar?: SanityObjectArray<SanityInternalLink>;
		footer?: {
			twitter?: string;
			instagram?: string;
			facebook?: string;
			links?: SanityObjectArray<SanityExternalLink>;
		};
	}
>;
