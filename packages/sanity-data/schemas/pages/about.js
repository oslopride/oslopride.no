export default {
  name: "about",
  title: "Om Oss",
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
