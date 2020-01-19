import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";

import JSONpreview from "./previews/json-preview";
import PagePreview from "./previews/page-preview";

export default S.listItem()
	.title("Pages")
	.schemaType("page")
	.child(
		S.documentTypeList("page")
			.title("Pages")
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType("page")
					.views([
						S.view.form().icon(EditIcon),
						S.view.component(PagePreview).title("Web"),
						S.view.component(JSONpreview).title("JSON")
					])
			)
	);
