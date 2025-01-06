import React from "react";
import g from "../../../lib/global.module.scss";
import type { CtaIconModel } from "../../../utils/icon";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section, { Themes } from "../../components/Section/Section";
import s from "./ImageText5050.module.scss";

import { SplitVerticalIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";
import { themeList } from "../../../../schema/themes";

export const imageText5050Schema = defineType({
  icon: SplitVerticalIcon,
  name: "imageText5050",
  type: "object",
  title: "Image Text 50/50",
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
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageAlign",
      title: "Image Alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { value: "left", title: "Left" },
          { value: "right", title: "Right" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description: "Will be a h2 tag",
    }),
    blockContent("contentOnly", undefined, "Text Content"),
    defineField({
      name: "ctas",
      title: "Link List",
      type: "linkList",
    }),
    themeList([Themes.navy]),
  ],
});

export type ImageText5050Props = React.HTMLAttributes<HTMLDivElement> & {
  _type: "ImageText5050";
  id: string;
  content: string;
  ctas?: CtaIconModel[];
  image: ImageModel;
  title?: string;
  theme?: Exclude<Themes, Themes.navy>;
  imageAlign: "left" | "right";
};

type Props = Omit<ImageText5050Props, "_type">;

const ImageText5050: React.FC<Props> = (props) => {
  return (
    <Section
      className={s.container}
      theme={props.theme}
      data-img-align={props.imageAlign}
      grid={true}
    >
      <div className={s.imageWrapper}>
        <img
          className={s.image}
          src={props.image.src}
          alt={props.image.altText}
          loading="lazy"
        />
      </div>

      <div className={s.contentWrapper}>
        {props.title ? <h2 className={s.title}>{props.title}</h2> : null}

        <div
          className={`${g.richText}`}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />

        {props.ctas && props.ctas.length > 0 ? (
          <CtaBlock id={props.id} items={props.ctas} />
        ) : null}
      </div>
    </Section>
  );
};

export default ImageText5050;
