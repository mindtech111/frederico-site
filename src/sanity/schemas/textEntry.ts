import { defineType, defineField } from "sanity";

export const textEntry = defineType({
  name: "textEntry",
  title: "Text",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "German", type: "string" },
        { name: "pt", title: "Portuguese (BR)", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Optional author or source attribution",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "de",
          title: "German",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "pt",
          title: "Portuguese (BR)",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      description: "Main image displayed at the top of the text and in the listing",
    }),
  ],
  orderings: [
    {
      title: "Date, Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "date",
      media: "image",
    },
  },
});
