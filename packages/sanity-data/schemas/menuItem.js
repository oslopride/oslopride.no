export default {
    name: 'menuItem',
    title: 'Menypunkt',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string'
        },
        {
            name: 'parent',
            title: 'Hører til hovedmeny',
            type: 'reference',
            to: {type: 'menuItem'}
        },
        {
            name: 'linksTo',
            title: 'Lenker til artikkel',
            type: 'reference',
            to: {type: 'article'}
        },
        {
            name: 'sortOrder',
            title: 'Sorteringsrekkefølge',
            type: 'number'
        },
    ]
}
