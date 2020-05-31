import S from "@sanity/desk-tool/structure-builder";
import EditIcon from "part:@sanity/base/edit-icon";
import { MdBusiness } from "react-icons/md";

import JSONpreview from "./previews/json-preview";

export default S.listItem()
	.title("Partner Overview")
	.icon(MdBusiness)
	.child(
		S.document()
			.title("Partner Overview")
			.id("partnerOverview")
			.schemaType("partnerOverview")
			.documentId("partnerOverview")
			.views([
				S.view.form().icon(EditIcon),
				S.view.component(JSONpreview).title("JSON")
			])
	);
