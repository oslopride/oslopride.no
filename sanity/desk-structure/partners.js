import S from "@sanity/desk-tool/structure-builder";

export default S.listItem()
	.title("Partners")
	.schemaType("partner")
	.child(S.documentTypeList("partner").title("Partners"));
