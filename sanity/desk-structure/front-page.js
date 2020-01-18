import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdHome } from "react-icons/lib/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Front Page")
	.icon(MdHome)
	.child(
		S.document()
			.title("Front Page")
			.id("front_page")
			.schemaType("front_page")
			.documentId("global_front_page")
			.views([
				S.view.form().icon(EditIcon),
				S.view.component(JSONpreview).title("JSON")
			])
	);
