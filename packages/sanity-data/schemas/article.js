import slugify from "../utils/slugify";

export default {
  name: "article",
  title: "Artikkel",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "preamble",
      title: "Ingress",
      validation: Rule =>
        Rule.required()
          .min(20)
          .max(140),
      type: "string"
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      }
    },
    {
      name: "body",
      title: "Innhold",
      validation: Rule => Rule.required(),
      type: "blockContent"
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      validation: Rule => Rule.required(),
      options: {
        source: "title",
        slugify: slugify("article")
      }
    }
  ]
};
