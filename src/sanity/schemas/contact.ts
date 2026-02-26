import { defineType, defineField } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "studio",
      title: "Studio Address",
      type: "object",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "country", title: "Country", type: "string" },
      ],
    }),
    defineField({
      name: "representation",
      title: "Gallery Representation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "gallery", title: "Gallery Name", type: "string" },
            { name: "city", title: "City", type: "string" },
            { name: "country", title: "Country", type: "string" },
            { name: "url", title: "Website", type: "url" },
          ],
          preview: {
            select: { title: "gallery", subtitle: "city" },
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social / External Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Vimeo", value: "vimeo" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Other", value: "other" },
                ],
              },
            },
            { name: "url", title: "URL", type: "url" },
            { name: "label", title: "Label (for Other)", type: "string" },
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "introText",
      title: "Contact Page Intro",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
        { name: "de", title: "German", type: "array", of: [{ type: "block" }] },
        { name: "pt", title: "Portuguese (BR)", type: "array", of: [{ type: "block" }] },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Information" };
    },
  },
});
