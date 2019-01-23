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
      name: "slug",
      title: "Adresse",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .slice(0, 200)
      }
    },
    {
      name: "image",
      title: "Hovedbilde",
      type: "image",
      options: {
        hotspot: true
      }
    },

    {
      name: "weight", // Sjekk om det er en dropdown-ting
      title: "Vekting",
      type: "string",
      options: {
        list: [
          { title: "Uviktig", value: "1" },
          { title: "Normal", value: "5" },
          { title: "Fremhevet", value: "10" }
        ]
      }
    },
    {
      name: "editorialState",
      type: "string",
      options: {
        list: [
          { title: "Needs review", value: "review" },
          { title: "Awaiting publication", value: "awaiting" },
          { title: "Published", value: "published" }
        ],
        layout: "radio"
      }
    }
  ]
};
