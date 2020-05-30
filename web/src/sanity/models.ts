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

export type SanityPartnerList = SanityObject<
	"partnerList",
	{
		title: string;
		partnerList: SanityObjectArray<SanityReference>;
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

export type SanityQuote = SanityObject<
	"quote",
	{
		content: Locale<string>;
		citation: string;
	}
>;

export type SanityBlock =
	| SanityAnnouncement
	| SanityAdvertisement
	| SanityTextArea
	| SanityPartnerList
	| SanityCollapsibleList
	| SanityPartnerPreview
	| SanityQuote;

/**
 *
 * DOCUMENTS
 *
 */

export type SanitySimpleEventList = Array<SanitySimpleEvent>;

export type SanitySimpleEvent = SanityDocument<
	"simpleEvent",
	{
		official: boolean;
		title: Locale<string>;
		image: SanityImage;
		description: Locale<SanityBlockContent>;
		startTime: string;
		endTime: string;
		price: Locale<string>;
		eventLink: string;
		organizer: string;
	}
>;

export type SanityFrontPage = SanityDocument<
	"frontPage",
	{
		header: SanityPageHeader;
		headliners: Locale<
			SanityObjectArray<
				SanityObject<
					"headliner",
					{
						title?: string;
						subtitle?: string;
					}
				>
			>
		>;
		featuredEvents: SanityObjectArray<SanitySimpleEvent>;
		callToAction: Locale<SanityAdvertisement>;
		featuredArticles: SanityObjectArray<SanityArticle>;
	}
>;

export type SanityPage = SanityDocument<
	"page",
	{
		slug: { current: string };
		header: SanityPageHeader;
		body: Locale<SanityObjectArray<SanityBlock>>;
	}
>;

export type SanityArticle = SanityDocument<
	"article",
	{
		slug: { current: string };
		title: Locale<string>;
		image: SanityImage;
		summary: Locale<string>;
		body: Locale<SanityObjectArray<SanityBlock>>;
		credits: Locale<string>;
	}
>;

export type SanityArticleList = Array<SanityArticle>;

export type SanityArchive = SanityDocument<
	"articleArchive",
	{
		title: Locale<string>;
		subtitle: Locale<string>;
		image: SanityImage;
	}
>;

export type SanityEventPage = SanityDocument<
	"eventOverview",
	{
		title: Locale<string>;
		subtitle: Locale<string>;
		image: SanityImage;
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
			links?: SanityObjectArray<SanityExternalLink | SanityInternalLink>;
		};
	}
>;
