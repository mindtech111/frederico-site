import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { sanityConfig } from "./config";

export const studioConfig = defineConfig({
  basePath: "/studio",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  title: "Frederico Theophilo Neto",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage Hero")
              .child(
                S.document()
                  .schemaType("homepageHero")
                  .documentId("homepage-hero-singleton")
              ),
            S.listItem()
              .title("Homepage Carousel")
              .child(S.documentTypeList("homepageImage")),
            S.divider(),
            S.listItem()
              .title("Works")
              .child(
                S.list()
                  .title("Works by Category")
                  .items([
                    S.listItem().title("All Works").child(S.documentTypeList("work")),
                    S.listItem().title("Texts").child(S.documentTypeList("textEntry").title("Texts")),
                    S.divider(),
                    ...[
                      { title: "Paintings", value: "paintings" },
                      { title: "Drawings", value: "drawings" },
                      { title: "Sculptures", value: "sculptures" },
                      { title: "Photography", value: "photography" },
                      { title: "Prints", value: "prints" },
                      { title: "Videos", value: "videos" },
                    ].map(({ title, value }) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.documentTypeList("work")
                            .title(title)
                            .filter('_type == "work" && category == $category')
                            .params({ category: value })
                        )
                    ),
                  ])
              ),
            S.listItem()
              .title("Exhibitions")
              .child(S.documentTypeList("exhibition")),
            S.listItem().title("Press").child(S.documentTypeList("press")),
            S.listItem().title("News").child(S.documentTypeList("news")),
            S.divider(),
            S.listItem()
              .title("The Artist")
              .child(
                S.document()
                  .schemaType("artist")
                  .documentId("artist-singleton")
              ),
            S.listItem()
              .title("Contact")
              .child(
                S.document()
                  .schemaType("contact")
                  .documentId("contact-singleton")
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
