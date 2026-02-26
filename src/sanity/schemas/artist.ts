import { defineType, defineField } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "The Artist",
  type: "document",
  fields: [
    defineField({
      name: "biography",
      title: "Biography",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "de", title: "German", type: "array", of: [{ type: "block" }] },
        { name: "pt", title: "Portuguese (BR)", type: "array", of: [{ type: "block" }] },
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cv",
      title: "CV / Résumé",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "de", title: "German", type: "array", of: [{ type: "block" }] },
        { name: "pt", title: "Portuguese (BR)", type: "array", of: [{ type: "block" }] },
      ],
    }),
    defineField({
      name: "chronology",
      title: "Chronology",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Year", type: "number" },
            {
              name: "event",
              title: "Event",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "de", title: "German", type: "string" },
                { name: "pt", title: "Portuguese (BR)", type: "string" },
              ],
            },
          ],
          preview: {
            select: { title: "year", subtitle: "event.en" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Artist Profile" };
    },
  },
});
