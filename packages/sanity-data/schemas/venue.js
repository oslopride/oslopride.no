export default {
  name: 'venue',
  title: 'Sted',
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
      name: 'address',
      title: 'Adresse',
      type: 'text'
    },
    {
      name: 'placeId',
      title: 'Google Maps Stedsidentifikator',
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
		name: 'location',
		title: 'Posisjon',
		type: 'geopoint'
	},{
  name: 'weight', // Sjekk om det er en dropdown-ting
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
