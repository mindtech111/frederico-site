import { defineType, defineField } from "sanity";

export const homepageImage = defineType({
  name: "homepageImage",
  title: "Homepage Carousel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For reference only — not shown on the site",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "German", type: "string" },
        { name: "pt", title: "Portuguese (BR)", type: "string" },
      ],
    }),
    defineField({
      name: "workReference",
      title: "Link to Work",
      type: "reference",
      to: [{ type: "work" }],
      description: "Optional: clicking the image goes to this work",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "order",
    },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: `Order: ${subtitle}` };
    },
  },
});
