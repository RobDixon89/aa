import React from "react";
import g from "../../../lib/global.module.scss";
import { type CtaIconModel } from "../../../utils/icon";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section from "../../components/Section/Section";
import type { UspModel } from "../../components/UspList/UspList";
import UspList from "../../components/UspList/UspList";
import s from "./RichText.module.scss";

import { MarkerIcon, TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";

export const richTextSchema = defineType({
  icon: TextIcon,
  name: "richText",
  type: "object",
  title: "Rich Text Block",
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
    blockContent("contentOnly", undefined, "Text Content"),
    defineField({
      name: "alignment",
      title: "Text Alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { value: "left", title: "Left" },
          { value: "center", title: "Centre" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctas",
      title: "Link List",
      type: "linkList",
    }),
    defineField({
      name: "usps",
      title: "Display USP List",
      type: "boolean",
    }),
  ],
});

export const locationListSchema = defineType({
  icon: MarkerIcon,
  name: "locationList",
  type: "object",
  title: "Location List",
  description:
    "Will display a list of all locations in a column, when placed on a category page this will link to the location page for that category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
    }),
  ],
});

export type RichTextProps = {
  id: string;
  alignment?: "left" | "center";
  ctas: CtaIconModel[];
  columns?: boolean;
  content: string;
  title?: string;
  uspList?: UspModel[];
};

const RichText: React.FC<RichTextProps> = (props) => {
  if (!props.content) {
    return null;
  }

  return (
    <Section grid={true}>
      <div
        className={s.container}
        data-align={props.alignment}
        data-columns={props.columns}
      >
        {props.title && <h2 className={s.title}>{props.title}</h2>}
        <div
          className={`${g.richText} ${s.richText}`}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />

        {props.ctas && props.ctas.length > 0 ? (
          <CtaBlock id={props.id} items={props.ctas} />
        ) : null}

        {props.uspList && props.uspList.length > 0 ? (
          <UspList id={props.id} items={props.uspList} theme="light" />
        ) : null}
      </div>
    </Section>
  );
};

export default RichText;
