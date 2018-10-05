export default {
  name: 'organizer',
  title: 'Arrangør',
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
      name: 'organizerWebpage',
      title: 'Organizer webpage',
      type: 'url'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },{
  name: 'weight',
  title: 'Vekting',
  type: 'number',
 	  options: {
 	    list: [
		{title: "Uviktig", 		value: 1},
		{title: "Normal", 		value: 5},
		{title: "Fremhevet", 	value: 10}
 	    ]
 	  }
}
  ]
}
