import { defineField } from "sanity";
import { linkField, linkSnippet } from "./linkList";

const blocks = [
  { type: "embeddedForm", name: "embeddedForm" },
  { type: "faqs", name: "faqs" },
  { type: "imageBlock", name: "imageBlock" },
  { type: "imageText5050", name: "imageText5050" },
  { type: "locationList", name: "locationList" },
  { type: "richText", name: "richText" },
  { type: "serviceCards", name: "serviceCards" },
  { type: "steps", name: "steps" },
  { type: "testimonials", name: "testimonials" },
];

export const blockContent = (
  type: "all" | "contentOnly",
  group?: string,
  title?: string,
  name?: string,
  description?: string
) =>
  defineField({
    title: title ?? "Content",
    name: name ?? "blockContent",
    type: "array",
    group: group ?? undefined,
    description: description ?? undefined,
    of: [
      {
        title: "Block",
        type: "block",
        styles:
          type !== "all"
            ? [
                { title: "Normal", value: "normal" },
                { title: "Large", value: "large" },
                { title: "Small", value: "small" },
                { title: "Subtitle", value: "subtitle" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ]
            : [],
        lists:
          type !== "all"
            ? [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ]
            : [],
        // Marks let you mark up inline text in the block editor.
        marks:
          type !== "all"
            ? {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
                annotations: [linkField],
              }
            : {
                decorators: [],
                annotations: [],
              },
      },
      ...(type === "all" ? blocks : []),
    ],
  });

export const contentOnlySnippet = `
  ...,
  markDefs[] {
    ...,
    ${linkSnippet}
  }
`;
