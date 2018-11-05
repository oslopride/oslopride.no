import S from '@sanity/desk-tool/structure-builder'

export default () =>
    S.list()
        .title("Desk")
        .items([
            S.listItem()
                .title('Festivalprogram')
                .child(
                    S.list()
                        .title("Festivalprogram")
                        .items([
                            S.listItem()
                                .title('Arrangementer')
                                .child(
                                    S.documentList()
                                        .title('Arrangementer')
                                        .menuItems(S.documentTypeList('event').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({type: 'event'})
                                ),
                            S.listItem()
                                .title('Arrangører')
                                .child(
                                    S.documentList()
                                        .title('Arrangører')
                                        .menuItems(S.documentTypeList('organizer').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({type: 'organizer'})
                                ),
                            S.listItem()
                                .title('Steder')
                                .child(
                                    S.documentList()
                                        .title('Steder')
                                        .menuItems(S.documentTypeList('venue').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({type: 'venue'})
                                ),
                            S.listItem()
                                .title('Gruppert på sted')
                                .child(
                                    S.documentList()
                                        .title('Sted')
                                        .menuItems(S.documentTypeList('venue').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({type: 'venue'})
                                        .child(parentId =>
                                            S.documentList()
                                                .title('Arrangement')
                                                .menuItems(S.documentTypeList("event").getMenuItems())
                                                .filter('_type == $type && defined(venue) && $parentId == venue._ref')
                                                .params({type: 'event', parentId})
                                        )
                                ),
                            S.listItem()
                                .title('Gruppert på arrangør')
                                .child(
                                    S.documentList()
                                        .title('Arrangør')
                                        .menuItems(S.documentTypeList('organizer').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({type: 'organizer'})
                                        .child(parentId =>
                                            S.documentList()
                                                .title('Arrangement')
                                                .menuItems(S.documentTypeList("event").getMenuItems())
                                                .filter('_type == $type && defined(organizer) && $parentId == organizer._ref')
                                                .params({type: 'event', parentId})
                                        )
                                ),
                            S.listItem()
                                .title('Arbeidsliste')
                                .child(
                                    S.list()
                                        .title('Arbeidsliste')
                                        .items([
                                            S.listItem()
                                                .title('Up for review')
                                                .child(
                                                    S.documentList()
                                                        .title('For review')
                                                        .filter('_type == $type && editorialState == $state')
                                                        .params({type: 'event', state: 'review'})
                                                ),
                                            S.listItem()
                                                .title('Awaiting publication')
                                                .child(
                                                    S.documentList()
                                                        .title('Awaiting publication')
                                                        .filter('_type == $type && editorialState == $state')
                                                        .params({type: 'event', state: 'awaiting'})
                                                ),
                                            S.listItem()
                                                .title('Published')
                                                .child(
                                                    S.documentList()
                                                        .title('Published')
                                                        .filter('_type == $type && editorialState == $state')
                                                        .params({type: 'event', state: 'published'})
                                                ),
                                            S.listItem()
                                                .title('Drafts')
                                                .child(
                                                    S.documentList()
                                                        .title('Drafts')
                                                        .filter('_type == $type && !defined(editorialState)')
                                                        .params({type: 'event'})
                                                ),
                                            S.listItem()
                                                .title('All articles')
                                                .child(S.documentTypeList('event'))
                                        ])
                                ),

                        ])
                ),

            S.listItem()
                .title('Menystruktur')
                .child(
                    S.documentList()
                        .title('Menystruktur')
                        .menuItems(S.documentTypeList('menuItem').getMenuItems())
                        .filter('_type == $type ')
                        .params({type: 'menuItem'})
                ),
            S.listItem()
                .title("Forside")
                .child(
                    S.editor()
                        .id('frontPage')
                        .schemaType("frontPage")
                        .documentId("global-front-page")
                ),
            S.listItem()
                .title('Innhold')
                .child(
                    S.documentList()
                        .title('Innhold')
                        .menuItems(S.documentTypeList('article').getMenuItems())
                        .filter('_type == $type ')
                        .params({type: 'article'})
                ),
            S.listItem()
                .title('Partnere')
                .child(
                    S.documentList()
                        .title('Partnere')
                        .menuItems(S.documentTypeList('partner').getMenuItems())
                        .filter('_type == $type ')
                        .params({type: 'partner'})
                )
            // The rest of the structure
        ]);