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
      type: "string",
      validation: Rule =>
        Rule.required()
          .min(20)
          .max(140)
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
        Rule.required()
          .unique()
          .error(
            "Det er ikke mulig å legge til den samme artikkelen flere ganger"
          )
      ]
    }
  ]
};
