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
      name: 'organizer',
      title: 'Organizer',
      type: 'reference',
		to: {type: 'organizer'}
    },
     {
      name: 'Date',
      title: 'date',
      type: 'datetime',
      options: {
         dateFormat: 'YYYY-MM-DD'
      }
    },
    {
      name: 'startingTime',
      title: 'Starting time',
      type: 'datetime',
       options: {
        timeFormat: 'HH:mm'
      }
    },
      {
      name: 'endingTime',
      title: 'Ending time',
      type: 'datetime',
      options: {
        timeFormat: 'HH:mm',
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent' // må gjøres om til blocktext-format-ting
    },
    {
      name: 'image', // Hovedbilde
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'venue',
      title: 'Sted',
      type: 'reference',
		to: {type: 'venue'} 
    },
     {
      name: 'prices',
      title: 'Prices',
      type: 'array', 
       of: [{
              title: 'Price',
              type: 'object',
              fields: [
                 {
                   name: 'amount', type: 'string', title: 'Amount',

                 },
                {
                  name: 'priceLabel', type: 'string', title: 'Price Label',
                }]
        }],

    },
    {
      name: 'deafInterpretation',
      title: 'Deaf interpretation',
      type: 'boolean',
    },
     {
      name: 'accessible',
      title: 'Accessible',
      type: 'boolean',
    },
     {
      name: 'free',
      title: 'Free',
      type: 'boolean',
    },

     {
      name: 'facebookEvent',
      title: 'Facebook Event',
      type: 'url'
    },
      {
      name: 'eventWebpage',
      title: 'Event webpage',
      type: 'url'
    },
      {
      name: 'ticketSaleWebpage',
      title: 'Ticket Sale Webpage',
      type: 'url'
    },
    {
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string'
    },
      {
      name: 'ageLimit', // Sjekk om det er en dropdown-ting
      title: 'Aldersgrense',
	  type: 'string',
 	  options: {
 	    list: [
			{value:"0"  ,title:"Fri aldersgrense"},
			{value:"18" ,title:"18 år"},
			{value:"19" ,title:"19 år"},
			{value:"20" ,title:"20 år"},
			{value:"21" ,title:"21 år"},
			{value:"22" ,title:"22 år"},
			{value:"23" ,title:"23 år"},
			{value:"24" ,title:"24 år"},
			{value:"25" ,title:"25 år"},
			{value:"26" ,title:"26 år"},
			{value:"99" ,title:"Aannet"}
 	    ]
 	  }
    },
    {
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
  },
  {
    name: 'feedbackFromEditor',
    title: 'Tilbakemelding fra redaktør',
    type: 'string'
  }
	
	// prosess-status: ny, oppdatert, godkjent == publisert, avvist, trenger endringer
  ]
}
