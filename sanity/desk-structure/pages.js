import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdLink } from "react-icons/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Pages")
	.icon(MdLink)
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
						S.view.component(JSONpreview).title("JSON")
					])
			)
	);
