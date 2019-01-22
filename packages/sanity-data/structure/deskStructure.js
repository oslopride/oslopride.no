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
        .title("Sider")
        .child(
          S.list()
          .title("pages")
          .items([
            S.listItem()
              .title("Forsiden")
              .child(
                S.editor()
                    .id('frontPage')
                    .schemaType("frontPage")
                    .documentId("global-front-page")),
            S.listItem()
              .title("Pride Art")
              .child(
                S.editor()
                .id('prideart')
                .schemaType('prideart')
                .documentId('global-pride-art')
              ),
            S.listItem()
              .title("Pride Park")
              .child(
                S.editor()
                .id('pridepark')
                .schemaType('pridepark')
                .documentId('global-pride-park')
              ),
            S.listItem()
              .title("Pride House")
              .child(
                S.editor()
                .id('pridehouse')
                .schemaType('pridehouse')
                .documentId('global-pride-house')
              ),
            S.listItem()
              .title("Pride Parade")
              .child(
                S.editor()
                .id('prideparade')
                .schemaType('prideparade')
                .documentId('global-pride-parade')
              ),
            S.listItem()
              .title("Om oss")
              .child(
                S.editor()
                .id('about')
                .schemaType('about')
                .documentId('global-about')
              ),
            S.listItem()
              .title("Kontakt")
              .child(
                S.editor()
                .id('contact')
                .schemaType('contact')
                .documentId('global-pride-art')
              )
          ])
        ),
      S.listItem()
        .title("Artikler")
        .child(
          S.documentList()
          .title("Artikler")
          .menuItems(S.documentTypeList('article').getMenuItems())
          .filter('_type == $type ')
          .params({type: 'article'})
        ),
      S.listItem()
        .title("Partnere")
        .child(
          S.documentList()
          .title("Partnere")
          .menuItems(S.documentTypeList('partner').getMenuItems())
          .filter('_type == $type ')
          .params({type: 'partner'})
        )
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
