import React from "react";
import g from "../../../lib/global.module.scss";
import { highlightTitleWords } from "../../../utils";
import type { CtaIconModel } from "../../../utils/icon";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section, { Themes } from "../../components/Section/Section";
import type { UspModel } from "../../components/UspList/UspList";
import UspList from "../../components/UspList/UspList";
import s from "./InnerPageBanner.module.scss";

export type InnerPageBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: "innerPageBanner";
  content?: string;
  ctas?: CtaIconModel[];
  image?: ImageModel;
  subtitle?: string;
  title: string;
  uspList?: UspModel[];
  theme: Exclude<Themes, Themes.default | Themes.navy>;
};

type Props = Omit<InnerPageBannerProps, "_type">;

// @todo: add breadcrumbs
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
