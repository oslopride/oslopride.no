export default {
  name: "contact",
  title: "Kontakt",
  type: "document",
  fields: [
    {
      name: "body",
      title: "Brødtekst",
      type: "blockContent",
      validation: Rule => Rule.required()
    }
  ]
};
