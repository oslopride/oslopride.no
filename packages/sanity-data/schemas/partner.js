export default {
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string"
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "partnerUrl",
      title: "Partners nettside",
      type: "url"
    },
    {
      name: "image",
      title: "Logo",
      type: "image",
      options: {
        hotspot: false
      }
    },
    {
      name: "type", // Sjekk om det er en dropdown-ting
      title: "Partner type",
      type: "string",
      options: {
        list: [
          { title: "Eier og arrangør", value: "owner" },
          { title: "Hovedpartner", value: "mainpartner" },
          { title: "Partner", value: "partner" }
        ]
      }
    }
  ]
};
