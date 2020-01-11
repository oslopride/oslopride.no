export default {
  title: "Link",
  name: "link",
  type: "object",
  fields: [
    {
      title: "Text",
      name: "text",
      type: "string"
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      validation: Rule => Rule.uri({ allowRelative: true })
    }
  ]
};
