export default {
  name: "pridehouse",
  title: "Pride House",
  type: "document",
  fields: [
    {
      name: "preamble",
      title: "Ingress",
      type: "blockContent",
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
      name: "body",
      title: "Innhold",
      type: "blockContent",
      validation: Rule => Rule.required()
    }
  ]
};
