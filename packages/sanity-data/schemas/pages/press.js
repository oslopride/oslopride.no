export default {
  name: "press",
  title: "Presse",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "Presse"
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
