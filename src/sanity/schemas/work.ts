import { defineType, defineField } from "sanity";
import { WORK_CATEGORIES } from "@/lib/constants";

export const work = defineType({
  name: "work",
  title: "Works",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: WORK_CATEGORIES,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "medium",
      title: "Medium / Technique",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "German", type: "string" },
        { name: "pt", title: "Portuguese (BR)", type: "string" },
      ],
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "e.g. 120 × 80 cm",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      description: "For videos, use a still/thumbnail here",
    }),
    defineField({
      name: "gallery",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "For video works: Vimeo or YouTube URL",
      hidden: ({ document }) => document?.category !== "videos",
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
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      media: "mainImage",
      subtitle: "category",
    },
  },
});
