import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdSettings } from "react-icons/lib/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Configuration")
	.icon(MdSettings)
	.child(
		S.document()
			.title("Configuration")
			.id("configuration")
			.schemaType("configuration")
			.documentId("global_configuration")
			.views([
				S.view.form().icon(EditIcon),
				S.view.component(JSONpreview).title("JSON")
			])
	);
