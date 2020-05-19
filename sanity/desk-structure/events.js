import S from "@sanity/desk-tool/structure-builder";
import { MdEvent } from "react-icons/md";

export default S.listItem()
	.icon(MdEvent)
	.title("Events")
	.schemaType("simpleEvent")
	.child(S.documentTypeList("simpleEvent").title("Events"));
