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
      name: 'organizator',
      title: 'Organizator',
      type: 'string'
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
      title: 'Location',
      type: 'reference',
      to: {type: 'location'}
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
      name: 'organizerWebpage',
      title: 'Organizer webpage',
      type: 'url'
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
      name: 'contactPersonEmail',
      title: 'Contact Person Email',
      type: 'string'
    },
      {
      name: 'ageLimit',
      title: 'Age Limit',
      type: 'string'
    },
  ]
}
