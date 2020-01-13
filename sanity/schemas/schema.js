// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents
import page from "./page";
import frontPage from "./front-page";
import configuration from "./configuration";

// Blocks
import blocks from "./blocks";
import hero from "./blocks/hero";
import textArea from "./blocks/text-area";

// Types
import portableText from "./types/portable-text";
import keyValuePair from "./types/key-value-pair";
import illustration from "./types/illustration";
import youtube from "./types/youtube";
import externalLink from "./types/external-link";
import internalLink from "./types/internal-link";
import localeBlock from "./types/locale-blocks";
import localeString from "./types/locale-string";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: "default",
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		page,
		frontPage,
		configuration,
		blocks,
		hero,
		textArea,
		portableText,
		keyValuePair,
		illustration,
		youtube,
		internalLink,
		externalLink,
		localeBlock,
		localeString
	])
});
