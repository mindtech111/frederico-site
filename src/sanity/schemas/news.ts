import { defineType, defineField } from "sanity";

export const news = defineType({
  name: "news",
  title: "News",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Exhibition", value: "exhibition" },
          { title: "Award", value: "award" },
          { title: "Publication", value: "publication" },
          { title: "Event", value: "event" },
          { title: "Announcement", value: "announcement" },
        ],
      },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "de", title: "German", type: "array", of: [{ type: "block" }] },
        { name: "pt", title: "Portuguese (BR)", type: "array", of: [{ type: "block" }] },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "link",
      title: "External Link",
      type: "url",
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
