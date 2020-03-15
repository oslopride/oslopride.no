import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";

import frontPage from "./front-page";
import pages from "./pages";
import articles from "./articles";
import partners from "./partners";
import configuration from "./configuration";
import events from "./events";

import JSONpreview from "./previews/json-preview";

// Hide document types that we already have a structure definition for
const hiddenDocTypes = listItem =>
	![
		"frontPage",
		"page",
		"article",
		"partner",
		"configuration",
		"event",
		"venue",
		"arena"
	].includes(listItem.getId());

export default () =>
	S.list()
		.title("Content")
		.items([
			frontPage,
			pages,
			articles,
			events,
			partners,
			configuration,
			...S.documentTypeListItems().filter(hiddenDocTypes)
		]);

export const getDefaultDocumentNode = props => {
	/**
	 * Here you can define fallback views for document types without
	 * a structure definition for the document node. If you want different
	 * fallbacks for different types, or document values (e.g. if there is a slug present)
	 * you can set up that logic in here too.
	 * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
	 */
	// const { schemaType } = props
	return S.document().views([
		S.view.form().icon(EditIcon),
		S.view.component(JSONpreview).title("JSON")
	]);
};
