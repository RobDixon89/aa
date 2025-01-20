import React from "react";
import Section, { Themes } from "../../components/Section/Section";
import s from "./ImageBlock.module.scss";

export type ImageBlockProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: "ImageBlock";
  image: ImageModel;
  theme?: Exclude<Themes, Themes.blue | Themes.yellow>;
  caption: string | null;
};

type Props = Omit<ImageBlockProps, "_type">;

const ImageBlock: React.FC<Props> = (props) => {
  return (
    <Section theme={props.theme} grid={true}>
      <figure
        className={s.imageWrapper}
        style={
          {
            "--ar": props.image.aspectRatio ?? 1.6,
          } as React.CSSProperties
        }
      >
        <img
          className={s.image}
          src={props.image.src}
          alt={props.image.altText}
          loading="lazy"
        />
        {props.caption ? (
          <figcaption className={s.caption}>{props.caption}</figcaption>
        ) : null}
      </figure>
    </Section>
  );
};

export default ImageBlock;
