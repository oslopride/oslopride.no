import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdArchive } from "react-icons/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Article Archive")
	.icon(MdArchive)
	.child(
		S.document()
			.title("Article Archive")
			.id("articleArchive")
			.schemaType("articleArchive")
			.documentId("articleArchive")
			.views([
				S.view.form().icon(EditIcon),
				S.view.component(JSONpreview).title("JSON")
			])
	);
