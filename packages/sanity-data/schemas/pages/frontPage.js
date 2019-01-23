export default {
  name: "frontPage",
  title: "Forside",
  type: "document",
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
      name: "permanentContent",
      title: "Fast innhold",
      type: "array",
      of: [
        {
          title: "Spalte",
          name: "section",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Overskrift",
              validation: Rule => Rule.required()
            },
            {
              name: "body",
              type: "array",
              of: [{ type: "block" }],
              title: "Tekst",
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
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
              name: "icon",
              type: "image",
              title: "Ikon",
              validation: Rule => Rule.required()
            },
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
            }
          ]
        }
      ]
    }
  ]
};
