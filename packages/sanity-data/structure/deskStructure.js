import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Desk")
    .items([
      S.listItem()
        .title("Program")
        .child(
          S.list()
            .title("Arrangementer")
            .items([
              S.listItem()
                .title("Nye")
                .child(
                  S.documentList()
                    .title("Nye bidrag")
                    .filter(
                      "_type == $type && !defined(prideHouse) && !defined(editorialState)"
                    )
                    .params({ type: "event" })
                ),
              S.listItem()
                .title("Til godkjenning")
                .child(
                  S.documentList()
                    .title("Venter på godkjenning")
                    .filter(
                      "_type == $type && !defined(prideHouse) && editorialState == $state"
                    )
                    .params({ type: "event", state: "review" })
                ),
              S.listItem()
                .title("Til publisering")
                .child(
                  S.documentList()
                    .title("Venter på publisering")
                    .filter(
                      "_type == $type && !defined(prideHouse) && editorialState == $state"
                    )
                    .params({ type: "event", state: "awaiting" })
                ),
              S.listItem()
                .title("Publisert")
                .child(
                  S.documentList()
                    .title("Publisert")
                    .filter(
                      "_type == $type && !defined(prideHouse) && editorialState == $state"
                    )
                    .params({ type: "event", state: "published" })
                ),
              S.listItem()
                .title("Avvist")
                .child(
                  S.documentList()
                    .title("Avvist")
                    .filter(
                      "_type == $type && !defined(prideHouse) && editorialState == $state"
                    )
                    .params({ type: "event", state: "rejected" })
                ),
              S.listItem()
                .title("Alle")
                .child(S.documentTypeList("event"))
            ])
        ),
      S.listItem()
        .title("Sider")
        .child(
          S.list()
            .title("Sider")
            .items([
              S.listItem()
                .title("Forsiden")
                .child(
                  S.editor()
                    .id("frontPage")
                    .title("Forsiden")
                    .schemaType("frontPage")
                    .documentId("global-front-page")
                ),
              S.listItem()
                .title("Pride Art")
                .child(
                  S.editor()
                    .id("prideart")
                    .title("Pride Art")
                    .schemaType("prideart")
                    .documentId("global-pride-art")
                ),
              S.listItem()
                .title("Pride Park")
                .child(
                  S.editor()
                    .id("pridepark")
                    .title("Pride Park")
                    .schemaType("pridepark")
                    .documentId("global-pride-park")
                ),
              S.listItem()
                .title("Pride House")
                .child(
                  S.editor()
                    .id("pridehouse")
                    .title("Pride House")
                    .schemaType("pridehouse")
                    .documentId("global-pride-house")
                ),
              S.listItem()
                .title("Pride Parade")
                .child(
                  S.editor()
                    .id("prideparade")
                    .title("Pride Parade")
                    .schemaType("prideparade")
                    .documentId("global-pride-parade")
                ),
              S.listItem()
                .title("Om oss")
                .child(
                  S.editor()
                    .id("about")
                    .title("Om oss")
                    .schemaType("about")
                    .documentId("global-about")
                ),
              S.listItem()
                .title("Kontakt")
                .child(
                  S.editor()
                    .id("contact")
                    .title("Kontakt")
                    .schemaType("contact")
                    .documentId("global-contact")
                ),
              S.listItem()
                .title("Bli Partner")
                .child(
                  S.editor()
                    .id("become-partner")
                    .title("Bli Partner")
                    .schemaType("become-partner")
                    .documentId("global-become-partner")
                ),
              S.listItem()
                .title("InterPride AGM 2020")
                .child(
                  S.editor()
                    .id("interpride")
                    .title("InterPride AGM 2020")
                    .schemaType("interpride")
                    .documentId("global-interpride")
                )
            ])
        ),
      S.listItem()
        .title("Artikler")
        .child(
          S.documentList()
            .title("Artikler")
            .menuItems(S.documentTypeList("article").getMenuItems())
            .filter("_type == $type ")
            .params({ type: "article" })
        ),
      S.listItem()
        .title("Partnere")
        .child(
          S.documentList()
            .title("Partnere")
            .menuItems(S.documentTypeList("partner").getMenuItems())
            .filter("_type == $type ")
            .params({ type: "partner" })
        ),
      S.listItem()
        .title("Områder")
        .child(
          S.documentList()
            .title("Områder")
            .menuItems(S.documentTypeList("venue").getMenuItems())
            .filter("_type == $type ")
            .params({ type: "venue" })
        ),

      S.listItem()
        .title("Pride House-programmet")
        .child(
          S.list()
            .title("Arrangementer")
            .items([
              S.listItem()
                .title("Nye")
                .child(
                  S.documentList()
                    .title("Nye bidrag")
                    .filter(
                      "_type == $type && prideHouse == true && !defined(editorialState)"
                    )
                    .params({ type: "event" })
                ),
              S.listItem()
                .title("Til godkjenning")
                .child(
                  S.documentList()
                    .title("Venter på godkjenning")
                    .filter(
                      "_type == $type && prideHouse == true && editorialState == $state"
                    )
                    .params({ type: "event", state: "review" })
                ),
              S.listItem()
                .title("Til publisering")
                .child(
                  S.documentList()
                    .title("Venter på publisering")
                    .filter(
                      "_type == $type && prideHouse == true && editorialState == $state"
                    )
                    .params({ type: "event", state: "awaiting" })
                ),
              S.listItem()
                .title("Publisert")
                .child(
                  S.documentList()
                    .title("Publisert")
                    .filter(
                      "_type == $type && prideHouse == true && editorialState == $state"
                    )
                    .params({ type: "event", state: "published" })
                ),
              S.listItem()
                .title("Avvist")
                .child(
                  S.documentList()
                    .title("Avvist")
                    .filter(
                      "_type == $type && prideHouse == true && editorialState == $state"
                    )
                    .params({ type: "event", state: "rejected" })
                )
            ])
        )
    ]);
