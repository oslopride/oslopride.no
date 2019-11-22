export default {
  name: "pridehouse",
  title: "Pride House",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "Pride House"
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
    },
    {
      name: "articles",
      title: "Artikler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      options: {
        sortable: true
      },
      validation: Rule => [
        Rule.unique().error(
          "Det er ikke mulig å legge til den samme artikkelen flere ganger"
        )
      ]
    }
  ]
};
