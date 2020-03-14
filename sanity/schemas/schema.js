// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents
import page from "./page";
import frontPage from "./front-page";
import webConfiguration from "./web-configuration";
import appConfiguration from "./app-configuration";
import article from "./article";
import partner from "./partner";
import event from "./event";
import arena from "./arena";
import venue from "./venue";

// Blocks
import blocks from "./blocks";
import textArea from "./blocks/text-area";
import announcement from "./blocks/announcement";
import advertisement from "./blocks/advertisement";
import collapsible from "./blocks/collapsible";
import partnerPreview from "./blocks/partner-preview";

// Types
import externalLink from "./types/external-link";
import internalLink from "./types/internal-link";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: "default",
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		frontPage,
		page,
		article,
		partner,
		webConfiguration,
		appConfiguration,
		event,
		arena,
		venue,

		blocks,
		textArea,
		announcement,
		advertisement,
		collapsible,
		partnerPreview,

		internalLink,
		externalLink
	])
});
