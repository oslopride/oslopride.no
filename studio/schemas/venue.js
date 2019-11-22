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
    }
  ]
};
