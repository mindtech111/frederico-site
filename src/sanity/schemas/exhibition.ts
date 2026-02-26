import { defineType, defineField } from "sanity";

export const exhibition = defineType({
  name: "exhibition",
  title: "Exhibitions",
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Solo Exhibition", value: "solo" },
          { title: "Group Exhibition", value: "group" },
          { title: "Art Fair", value: "fair" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location (City, Country)",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "de", title: "German", type: "array", of: [{ type: "block" }] },
        { name: "pt", title: "Portuguese (BR)", type: "array", of: [{ type: "block" }] },
      ],
    }),
    defineField({
      name: "images",
      title: "Exhibition Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "pressRelease",
      title: "Press Release",
      type: "file",
    }),
  ],
  orderings: [
    {
      title: "Date, Newest First",
      name: "dateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "venue",
      date: "startDate",
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle || ""} ${date ? `(${date.slice(0, 4)})` : ""}`.trim(),
      };
    },
  },
});
