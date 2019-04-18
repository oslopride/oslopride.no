export default {
  name: "event",
  title: "Arrangement",
  type: "document",
  fields: [
    {
      name: "editorialState",
      title: "Godkjenningsstatus",
      type: "string",
      options: {
        list: [
          { title: "Venter på godkjenning", value: "review" },
          { title: "Godkjent, klar til publisering", value: "awaiting" },
          { title: "Publisert", value: "published" },
          { title: "Avvist", value: "rejected" }
        ],
        layout: "radio"
      }
    },
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "official",
      title: "Offisielt",
      type: "boolean",
      validation: Rule => Rule.required()
    },
    {
      name: "deafInterpretation",
      title: "Tegnspråktolket",
      type: "boolean",
      validation: Rule => Rule.required()
    },
    {
      name: "accessible",
      title: "Universell utforming",
      type: "boolean",
      validation: Rule => Rule.required()
    },
    {
      name: "startingTime",
      title: "Starter",
      type: "datetime",
      validation: Rule => Rule.required()
    },
    {
      name: "endingTime",
      title: "Slutter",
      type: "datetime",
      validation: Rule => Rule.required()
    },
    {
      name: "location",
      title: "Sted",
      type: "object",
      validation: Rule => Rule.required(),
      fields: [
        {
          name: "name",
          title: "Navn",
          type: "string",
          validation: Rule => Rule.required()
        },
        {
          name: "address",
          title: "Adresse",
          type: "string",
          validation: Rule => Rule.required()
        },
        {
          name: "venue",
          title: "Område",
          type: "reference",
          to: { type: "venue" }
        }
      ]
    },
    {
      name: "free",
      title: "Gratis",
      type: "boolean",
      validation: Rule => Rule.required()
    },
    {
      name: "prices",
      title: "Priser",
      type: "array",
      of: [
        {
          title: "Pris",
          type: "object",
          fields: [
            {
              name: "amount",
              type: "number",
              title: "Beløp",
              validation: Rule => Rule.required()
            },
            {
              name: "priceLabel",
              type: "string",
              title: "Beskrivelse",
              validation: Rule =>
                Rule.required()
                  .min(1)
                  .max(20)
            }
          ]
        }
      ]
    },
    {
      name: "ageLimit",
      title: "Aldersgrense",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: [
          { value: "0", title: "Fri aldersgrense" },
          { value: "18", title: "18 år" },
          { value: "19", title: "19 år" },
          { value: "20", title: "20 år" },
          { value: "21", title: "21 år" },
          { value: "22", title: "22 år" },
          { value: "23", title: "23 år" },
          { value: "24", title: "24 år" },
          { value: "25", title: "25 år" },
          { value: "26", title: "26 år" },
          { value: "99", title: "Annet" }
        ]
      }
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "blockContent",
      validation: Rule => Rule.required()
    },
    {
      name: "category",
      title: "Programkategori",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: [
          { value: "0", title: "Annet" },
          { value: "1", title: "Pride Parade" },
          { value: "2", title: "Pride Park" },
          { value: "3", title: "Pride House" },
          { value: "4", title: "Pride Art" }
        ]
      }
    },
    {
      name: "eventType",
      title: "Arrangmentstype",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: [
          { value: "0", title: "Annet" },
          { value: "1", title: "Konsert" },
          { value: "2", title: "Debatt" },
          { value: "3", title: "Utstilling" },
          { value: "4", title: "Fest" }
        ]
      }
    },
    {
      name: "organizer",
      title: "Arrangør",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "ticketSaleWebpage",
      title: "Lenke til billettsalg",
      type: "url"
    },
    {
      name: "contactPerson",
      title: "Kontaktperson",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Navn",
          type: "string"
        },
        {
          name: "epost",
          title: "Epost",
          type: "string"
        }
      ]
    },
    {
      name: "documentOwner",
      title: "Dokumenteier",
      type: "string",
      hidden: true
    },
    {
      name: "prideHouse",
      title: "Gjelder Pride House",
      type: "boolean",
      hidden: true
    }
  ]
};
