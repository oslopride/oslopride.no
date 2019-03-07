export default {
  name: "about",
  title: "Om Oss",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "Om Oss"
      };
    }
  },
  fields: [
    {
      name: "body",
      title: "Brødtekst",
      type: "blockContent",
      validation: Rule => Rule.required()
    }
  ]
};
