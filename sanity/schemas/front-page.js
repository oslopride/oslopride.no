export default {
  title: "Front Page",
  name: "front_page",
  type: "document",
  fields: [
    {
      title: "blocks",
      name: "blocks",
      type: "array",
      of: [
        { type: "hero" }
      ]
    }
  ]
}