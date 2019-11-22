export default {
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "array",
      of: [{ type: "block" }],
      validation: Rule => Rule.required()
    },
    {
      name: "partnerUrl",
      title: "Partners nettside",
      type: "url",
      validation: Rule => Rule.required()
    },
    {
      name: "image",
      title: "Logo",
      type: "image",
      options: {
        hotspot: false
      },
      validation: Rule => Rule.required()
    },
    {
      name: "type", // Sjekk om det er en dropdown-ting
      title: "Partner type",
      type: "string",
      options: {
        list: [
          { title: "Eier og arrangør", value: "owner" },
          { title: "Hovedpartner", value: "mainpartner" },
          { title: "Partner", value: "partner" },
          { title: "Støttepartner", value: "supportpartner" }
        ]
      },
      validation: Rule => Rule.required()
    }
  ]
};
