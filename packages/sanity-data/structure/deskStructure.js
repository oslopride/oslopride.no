import S from "@sanity/desk-tool/structure-builder";
 
export default () =>
  S.list()
    .title("Desk")
    .items([
      S.listItem()
        .title("Artikkel")
        .child(
          S.editor()
            .id('article')
            .schemaType("article")
            .documentId("global-config")
        )
    ]);