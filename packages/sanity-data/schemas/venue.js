export default {
  name: "venue",
  title: "Område",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: Rule => Rule.required()
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
      type: "text"
    },
    {
      name: "address",
      title: "Adresse",
      type: "string"
    },
    {
      name: "placeId",
      title: "Google Maps lenke",
      type: "url"
    }
  ]
};
