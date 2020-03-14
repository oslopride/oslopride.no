// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents
import page from "./page";
import frontPage from "./front-page";
import configuration from "./configuration";
import article from "./article";
import partner from "./partner";

// Blocks
import blocks from "./blocks";
import textArea from "./blocks/text-area";
import announcement from "./blocks/announcement";
import advertisement from "./blocks/advertisement";
<<<<<<< HEAD
import partnerList from "./blocks/partner-list";
=======
import collapsible from "./blocks/collapsible";
>>>>>>> master

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
		configuration,

		blocks,
		textArea,
		announcement,
		advertisement,
<<<<<<< HEAD
		partnerList,
=======
		collapsible,
>>>>>>> master

		internalLink,
		externalLink,
		partnerList
	])
});
