import S from "@sanity/desk-tool/structure-builder";
 
export default () =>
  S.list()
    .title("Desk")
    .items([
      S.listItem()
      .title("Program")
      .child(
        S.list()
        .title("Program")
        .child(
          S.listItem()
            .title("Arrangementer"),
          S.listItem()
            .title("Arbeidsliste")
        ),
      ),
      S.listItem()
        .title("Forsiden")
        .child(
          S.editor()
              .id('frontPage')
              .schemaType("article")
              .documentId("global-front-page")),
      S.listItem()
        .title("Pride Art"),
      S.listItem()
        .title("Pride Park"),
      S.listItem()
        .title("Pride House"),
      S.listItem()
        .title("Pride Parade"),
      S.listItem()
        .title("Om oss"),
      S.listItem()
        .title("Kontakt"),
      S.listItem()
        .title("Partnere")
    ]);

/* Desk - list
    frontPage list-item
    pride-art
    pride-park
    ..
    about
    contact
    program
      events
      arbeidsliste
    partners
*/