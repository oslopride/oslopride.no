export default {
  name: 'menuItem',
  title: 'Menypunkt',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'Parent',
      name: 'parent',
      type: 'reference',
      to: [{type: 'menuItem'}]
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text'
    }
  ]
}
