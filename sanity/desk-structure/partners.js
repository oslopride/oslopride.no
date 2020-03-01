import S from "@sanity/desk-tool/structure-builder";
import { MdBusinessCenter } from "react-icons/md";

export default S.listItem()
	.title("Partners")
	.icon(MdBusinessCenter)
	.schemaType("partner")
	.child(S.documentTypeList("partner").title("Partners"));
