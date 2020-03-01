import S from "@sanity/desk-tool/structure-builder";
import { MdFormatAlignLeft } from "react-icons/md";

export default S.listItem()
	.icon(MdFormatAlignLeft)
	.title("Articles")
	.schemaType("article")
	.child(S.documentTypeList("article").title("Articles"));
