import React from "react";
import g from "../../../lib/global.module.scss";
import { highlightTitleWords } from "../../../utils";
import type { CtaIconModel } from "../../../utils/icon";
import { LinkButton } from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import type { UspModel } from "../../components/UspList/UspList";
import UspList from "../../components/UspList/UspList";
import s from "./HomeHero.module.scss";

export type HomeHeroProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: "homeHero";
  content?: string;
  ctas?: CtaIconModel[];
  image?: ImageModel;
  title: string;
  uspList?: UspModel[];
};

type Props = Omit<HomeHeroProps, "_type">;

const HomeHero: React.FC<Props> = (props) => {
  return (
    <Section className={s.homeHero} grid={true}>
      {props.image && props.image.src ? (
        <img
          className={s.bgImage}
          src={props.image.src}
          alt={props.image.altText}
          loading="eager"
        />
      ) : null}
      <div className={s.contentWrapper}>
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
          <div className={s.ctaBlock}>
            {props.ctas.map((cta, i) => (
              <LinkButton
                key={`home-hero-cta-${i}`}
                theme={i === 0 ? "outline" : "text"}
                href={cta.url}
                label={cta.text}
                icon={cta.icon}
                target={cta.target}
              />
            ))}
          </div>
        ) : null}
      </div>

      {props.uspList && props.uspList.length > 0 ? (
        <UspList id={"home-hero"} items={props.uspList} theme="default" />
      ) : null}
    </Section>
  );
};

export default HomeHero;
