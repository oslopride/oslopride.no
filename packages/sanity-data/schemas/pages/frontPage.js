export default {
  name: "frontPage",
  title: "Forside",
  type: "document",
  preview: {
    select: {},
    prepare() {
      return {
        title: "Forside"
      };
    }
  },
  fields: [
    {
      name: "callToActionImage",
      title: "Hovedbilde",
      type: "image",
      validation: Rule => Rule.required()
    },
    {
      name: "callToActionTitle",
      title: "Hovedtittel",
      type: "string",
      validation: Rule => Rule.required()
    },

    {
      name: "callToActionBody",
      title: "Hovedtekst",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "featuredDates",
      title: "Hoveddatoer",
      type: "array",
      of: [
        {
          title: "Dato",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Tittel",
              validation: Rule => Rule.required()
            },
            {
              name: "date",
              type: "string",
              title: "Dato",
              validation: Rule => Rule.required()
            },
            {
              name: "description",
              type: "string",
              title: "Kort beskrivelse",
              validation: Rule => Rule.required().max(140)
            },
            {
              name: "subtitle",
              type: "string",
              title: "Farget undertekst",
              validation: Rule => Rule.required()
            },
            {
              name: "link",
              type: "url",
              title: "Lenke til arrangement",
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
    },
    {
      name: "featuredCallToActions",
      title: "Engasjer deg",
      type: "array",
      of: [
        {
          title: "Lenke",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Tittel",
              validation: Rule => Rule.required()
            },
            {
              name: "link",
              type: "url",
              title: "Lenke",
              validation: Rule => Rule.required()
            },
            {
              name: "icon",
              type: "image",
              title: "Ikon",
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
    },
    {
      name: "featuredArticles",
      title: "Fremhevede artikler",
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
          ),
        Rule.required()
          .max(6)
          .error("Det er kun plass til 6 fremhevede artikler på forsiden."),
        Rule.min(6).warning(
          "Forsiden ser best ut om det er 6 fremhevede artikler."
        )
      ]
    }
  ]
};
