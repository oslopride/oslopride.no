export default {
  name: "prideparade",
  title: "Pride Parade",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "Pride Parade"
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
