import React from "react";
import g from "../../../lib/global.module.scss";
import type { CtaIconModel } from "../../../utils/icon";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section, { Themes } from "../../components/Section/Section";
import s from "./ImageText5050.module.scss";

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
        <div className={s.imageInner}>
          <img
            className={s.image}
            src={props.image.src}
            alt={props.image.altText}
            loading="lazy"
          />
        </div>
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
