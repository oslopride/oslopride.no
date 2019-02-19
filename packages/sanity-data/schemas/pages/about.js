export default {
  name: "about",
  title: "Om Oss",
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
