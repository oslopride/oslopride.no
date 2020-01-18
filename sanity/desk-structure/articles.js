import S from "@sanity/desk-tool/structure-builder";

export default S.listItem()
	.title("Articles")
	.schemaType("article")
	.child(S.documentTypeList("article").title("Articles"));
