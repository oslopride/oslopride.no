export default {
  name: "interpride",
  title: "InterPride AGM 2020",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "InterPride AGM 2020"
      };
    }
  },
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
