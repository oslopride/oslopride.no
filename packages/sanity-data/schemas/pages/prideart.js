export default {
  name: "prideart",
  title: "Pride Art",
  type: "document",
  fields: [
    {
      name: "preamble",
      title: "Ingress",
      type: "array",
      of: [{ type: "block" }]
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
      type: "array",
      of: [{ type: "block" }]
    }
  ]
};
