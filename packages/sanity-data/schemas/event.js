export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'startDateTime',
      title: 'Starttidspunkt',
      type: 'datetime'
    },
    {
      name: 'endDateTime',
      title: 'Sluttidspunkt',
      type: 'datetime'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: {type: 'location'}
    },
  ]
}
