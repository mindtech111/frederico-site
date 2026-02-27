import { defineType, defineField } from "sanity";

export const homepageHero = defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "document",
  fields: [
    defineField({
      name: "heroType",
      title: "Hero Type",
      type: "string",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Image Carousel", value: "carousel" },
        ],
        layout: "radio",
      },
      initialValue: "video",
      validation: (Rule) => Rule.required(),
      description:
        "Choose whether the homepage shows a full-screen video or the image carousel",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description: "Upload an MP4 or WebM video (recommended: MP4 H.264, under 50 MB)",
      hidden: ({ parent }) => parent?.heroType !== "video",
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Shown while the video loads and as fallback on slow connections",
      hidden: ({ parent }) => parent?.heroType !== "video",
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
      description: "Optional caption displayed over the video",
    }),
    defineField({
      name: "workReference",
      title: "Link to Work",
      type: "reference",
      to: [{ type: "work" }],
      description: "Optional: overlay link to a specific work",
    }),
  ],
  preview: {
    select: {
      heroType: "heroType",
      media: "posterImage",
    },
    prepare({ heroType, media }) {
      return {
        title: "Homepage Hero",
        subtitle: heroType === "video" ? "Video" : "Image Carousel",
        media,
      };
    },
  },
});
