import React from "react";
import g from "../../../lib/global.module.scss";
import { highlightTitleWords } from "../../../utils";
import Icon, { IconType, type CtaIconModel } from "../../../utils/icon";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section, { Themes } from "../../components/Section/Section";
import type { UspModel } from "../../components/UspList/UspList";
import UspList from "../../components/UspList/UspList";
import s from "./InnerPageBanner.module.scss";

import { defineField, defineType } from "sanity";
import { blockContent } from "../../../../schema/blockContent";
import { themeList } from "../../../../schema/themes";

export const innerPageBannerSchema = defineType({
  name: "innerPageBanner",
  type: "object",
  title: "Page Banner",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description:
        "Wrap words in asterisks to add a highlight, eg. Your local TV Aerial and Satellite *specialists*",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Sub Heading",
      description:
        "Displayed before the heading, will default to the name of the parent page if unpopulated",
    }),
    blockContent("contentOnly", undefined, "Text Content"),
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
    themeList([Themes.default, Themes.navy]),
  ],
});

export type InnerPageBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: "innerPageBanner";
  breadcrumbs: CtaModel[];
  content?: string;
  ctas?: CtaIconModel[];
  image?: ImageModel;
  subtitle?: string;
  theme: Exclude<Themes, Themes.default | Themes.navy>;
  title: string;
  uspList?: UspModel[];
};

type Props = Omit<InnerPageBannerProps, "_type">;

const InnerPageBanner: React.FC<Props> = (props) => {
  return (
    <Section className={s.innerPageBanner} grid={true} theme={props.theme}>
      {props.image && props.image.src ? (
        <div className={s.imageWrapper}>
          <img
            className={s.image}
            src={props.image.src}
            alt={props.image.altText}
            loading="eager"
          />
        </div>
      ) : null}

      <nav aria-label="Breadcrumb" className={s.breadcrumbs}>
        <ol>
          {props.breadcrumbs.map((b, i) => (
            <li key={`breadcrumb-${i}`}>
              <a
                href={b.url}
                target={b.target}
                aria-current={
                  i === props.breadcrumbs.length - 1 ? "page" : undefined
                }
              >
                {b.text}
              </a>
              {i < props.breadcrumbs.length - 1 ? (
                <Icon icon={IconType.chevron} />
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      <div className={s.contentWrapper}>
        {props.subtitle && <p className={g.subtitle}>{props.subtitle}</p>}
        <h1
          className={s.title}
          dangerouslySetInnerHTML={{ __html: highlightTitleWords(props.title) }}
        />
        {props.content && (
          <div
            className={`${g.richText} ${s.content}`}
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        )}

        {props.ctas && props.ctas.length > 0 ? (
          <CtaBlock id="page-banner" items={props.ctas} />
        ) : null}
      </div>

      {props.uspList && props.uspList.length > 0 ? (
        <UspList id={"home-hero"} items={props.uspList} theme="default" />
      ) : null}
    </Section>
  );
};

export default InnerPageBanner;
