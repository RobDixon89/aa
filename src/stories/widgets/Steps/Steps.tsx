import React from "react";
import g from "../../../lib/global.module.scss";
import Section, { Themes } from "../../components/Section/Section";
import s from "./Steps.module.scss";

import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";
import { themeList } from "../../../../schema/themes";

export const stepsSchema = defineType({
  icon: DashboardIcon,
  name: "steps",
  type: "object",
  title: "Steps",
  preview: {
    select: {
      title: "title",
      blockContent: "blockContent",
    },
    prepare(selection) {
      const { title, blockContent } = selection;
      return {
        title: title ? title : blockContent?.[0]?.children[0].text,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description: "Will be a h2 tag",
    }),
    blockContent("contentOnly", undefined, "Introduction"),
    defineField({
      name: "items",
      title: "Steps",
      type: "array",
      of: [
        defineField({
          name: "step",
          type: "object",
          title: "Content Step",
          preview: {
            select: {
              title: "blockContent",
            },
          },
          fields: [
            blockContent("contentOnly", undefined, "Content"),
            themeList([Themes.default, Themes.blue]),
          ],
        }),
        defineField({
          name: "stepImage",
          type: "object",
          title: "Image Step",
          preview: {
            select: {
              title: "image.altText",
            },
          },
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "imageWithAlt",
            }),
            defineField({
              name: "imageType",
              title: "Image Type",
              type: "string",
              description:
                "Should the image expand to cover the entire square or should it be contained within without cropping (eg. a logo)",
              initialValue: "cover",
              options: {
                list: [
                  { value: "contain", title: "Cover" },
                  { value: "cover", title: "Contain" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctas",
      title: "Link List",
      type: "linkList",
    }),
    themeList([Themes.lightBlue, Themes.yellow, Themes.navy]),
  ],
});

export type StepsProps = {
  id: string;
  content: string;
  title?: string;
  theme: Exclude<Themes, Themes.lightBlue | Themes.yellow | Themes.navy>;
};

const Steps: React.FC<StepsProps> = (props) => {
  if (!props.content) {
    return null;
  }

  return (
    <Section grid={true}>
      <div className={s.container}>
        {props.title && <h2 className={s.title}>{props.title}</h2>}
        <div
          className={`${g.richText}`}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </Section>
  );
};

export default Steps;
