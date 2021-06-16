import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdBusiness } from "react-icons/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Livestream")
	.icon(MdBusiness)
	.child(
		S.document()
			.title("Livestream")
			.id("livestream")
			.schemaType("livestream")
			.documentId("global_livestream")
			.views([
				S.view.form().icon(EditIcon),
				S.view.component(JSONpreview).title("JSON")
			])
	);
