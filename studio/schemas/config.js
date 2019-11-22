export default {
  name: "config",
  title: "Configuration",
  type: "object",
  fields: [
    {
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      of: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [
            {
              name: "url",
              type: "url",
              title: "URL"
            },
            {
              name: "name",
              title: "Name",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};
