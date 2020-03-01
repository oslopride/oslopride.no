import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdHome } from "react-icons/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Front Page")
	.icon(MdHome)
	.child(
		S.document()
			.title("Front Page")
			.id("frontPage")
			.schemaType("frontPage")
			.documentId("global_frontPage")
			.views([
				S.view.form().icon(EditIcon),
				S.view.component(JSONpreview).title("JSON")
			])
	);
