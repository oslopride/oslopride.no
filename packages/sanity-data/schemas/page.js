import slugify from "../utils/slugify";

export default {
  name: "page",
  title: "Side",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "body",
      title: "Brødtekst",
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
    },
    {
      type: "object",
      name: "seo",
      title: "Sosiale medier og søk",
      fields: [
        {
          type: "string",
          name: "description",
          title: "Beskrivelse",
          validation: Rule => Rule.min(20).max(140)
        },
        {
          type: "image",
          name: "image",
          title: "Bilde",
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      validation: Rule => Rule.required(),
      options: {
        source: "title",
        slugify: slugify("page")
      }
    }
  ]
};
