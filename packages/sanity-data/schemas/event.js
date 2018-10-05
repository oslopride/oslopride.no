export default {
  name: 'event',
  title: 'Arrangement',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
	  validation: Rule => Rule.required()
    },
	
    {
      name: 'organizer',
      title: 'Arrangør',
	  validation: Rule => Rule.required(),
      type: 'reference',
		to: {type: 'organizer'}
    },
    {
      name: 'venue',
      title: 'Sted',
	  validation: Rule => Rule.required(),
      type: 'reference',
		to: {type: 'venue'} 
    },
    {
      name: 'startingTime',
      title: 'Starter',
      type: 'datetime',
	  validation: Rule => Rule.required()
    },
      {
      name: 'endingTime',
      title: 'Slutter',
      type: 'datetime',
  	  validation: Rule => Rule.required()
    },
    {
      name: 'image', // Hovedbilde
      title: 'Hovedbilde',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'blockContent' // må gjøres om til blocktext-format-ting
    },
    {
     name: 'free',
     title: 'Gratis',
     type: 'boolean',
   },
    
     {
      name: 'prices',
      title: 'Priser',
      type: 'array', 
       of: [{
              title: 'Pris',
              type: 'object',
              fields: [
                 {
                   name: 'amount', type: 'number', title: 'Beløp', validation: Rule => Rule.required(),
                 },
                {
                  name: 'priceLabel', type: 'string', title: 'Type', validation: Rule => Rule.required().min(1).max(20),
                }]
        }],
    },
    {
    name: 'ageLimit', // Sjekk om det er en dropdown-ting
    title: 'Aldersgrense',
  type: 'string',
  validation: Rule => Rule.required(),
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
      name: 'deafInterpretation',
      title: 'Tegnspråktolket',
      type: 'boolean',
    },
     {
      name: 'accessible',
      title: 'Universell utforming',
      type: 'boolean',
    },
     

     {
      name: 'facebookEvent',
      title: 'Link til Facebook event',
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
      name: 'contactPersonEmail',
      title: 'Contact Person email',
      type: 'string'
    },

    {
    name: 'weight', // Sjekk om det er en dropdown-ting
    title: 'Vekting',
    type: 'string',
   	  options: {
   	    list: [
			{title: "Uviktig", 		value: "1"},
			{title: "Normal", 		value: "5"},
			{title: "Fremhevet", 	value: "10"}
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
