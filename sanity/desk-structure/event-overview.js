import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdEventNote } from "react-icons/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Event Overview")
	.icon(MdEventNote)
	.child(
		S.document()
			.title("Events Overview")
			.id("eventOverview")
			.schemaType("eventOverview")
			.documentId("eventOverview")
			.views([
				S.view.form().icon(EditIcon),
				S.view.component(JSONpreview).title("JSON")
			])
	);
