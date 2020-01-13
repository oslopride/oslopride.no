import S from "@sanity/desk-tool/structure-builder";

export default () =>
	S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Front Page")
				.child(
					S.editor()
						.title("Front Page")
						.id("front_page")
						.schemaType("front_page")
						.documentId("global_front_page")
				),
			S.listItem()
				.title("Pages")
				.child(S.documentTypeList("page").title("Pages")),
			S.listItem()
				.title("Articles")
				.child(S.documentTypeList("article").title("Articles")),
			S.listItem()
				.title("Configuration")
				.child(
					S.editor()
						.title("Configuration")
						.id("configuration")
						.schemaType("configuration")
						.documentId("global_configuration")
				)
		]);
