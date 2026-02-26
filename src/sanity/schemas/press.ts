import { defineType, defineField } from "sanity";

export const press = defineType({
  name: "press",
  title: "Press",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article / Publication Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publication",
      title: "Publication / Media Outlet",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Review", value: "review" },
          { title: "Interview", value: "interview" },
          { title: "Feature", value: "feature" },
          { title: "Catalogue Essay", value: "catalogue" },
          { title: "Book", value: "book" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 4 },
        { name: "de", title: "German", type: "text", rows: 4 },
        { name: "pt", title: "Portuguese (BR)", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "url",
      title: "Link to Article",
      type: "url",
    }),
    defineField({
      name: "pdf",
      title: "PDF Upload",
      type: "file",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
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
      title: "title",
      subtitle: "publication",
      media: "coverImage",
    },
  },
});
