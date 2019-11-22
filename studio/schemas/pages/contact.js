export default {
  name: "contact",
  title: "Kontakt",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "Kontakt"
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
