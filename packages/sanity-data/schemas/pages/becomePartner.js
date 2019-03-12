export default {
  name: "become-partner",
  title: "Bli Partner",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "Bli Partner"
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
