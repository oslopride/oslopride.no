export default {
  name: "contact",
  title: "Kontakt",
  type: "document",
  fields: [
    {
      name: "body",
      title: "Brødtekst",
      type: "array",
      of: [{ type: "block" }],
      validation: Rule => Rule.required()
    }
  ]
};
