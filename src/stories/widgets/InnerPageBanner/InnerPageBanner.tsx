import React from "react";
import g from "../../../lib/global.module.scss";
import { highlightTitleWords, insertLocationName } from "../../../utils";
import Icon, { IconType, type CtaIconModel } from "../../../utils/icon";
import { getSrcs } from "../../../utils/image";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section, { Themes } from "../../components/Section/Section";
import type { UspModel } from "../../components/UspList/UspList";
import UspList from "../../components/UspList/UspList";
import s from "./InnerPageBanner.module.scss";

export type InnerPageBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: "innerPageBanner";
  breadcrumbs: CtaModel[];
  ctas?: CtaIconModel[];
  image?: ImageModel;
  subtitle?: string;
  theme: Exclude<Themes, Themes.default | Themes.navy>;
  title: string;
  uspList?: UspModel[];
  location?: string;
};

type Props = Omit<InnerPageBannerProps, "_type">;

const InnerPageBanner: React.FC<Props> = (props) => {
  const srcs = props.image
    ? getSrcs(props.image, 375, 1000, 16, 375 / 208)
    : undefined;

  const children = React.useMemo(
    () =>
      props.children
        ? insertLocationName(props.children, props.location)
        : undefined,
    []
  );

  return (
    <Section className={s.innerPageBanner} grid={true} theme={props.theme}>
      {props.image && props.image.src && srcs ? (
        <div className={s.imageWrapper}>
          <img
            className={s.image}
            src={srcs.src}
            srcSet={srcs.srcSet}
            alt={props.image.altText}
            loading="eager"
            sizes={`(max-width: 1023px) 100%, 33%`}
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

        {children ? (
          <div
            className={`${g.richText} ${s.content}`}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        ) : null}

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
