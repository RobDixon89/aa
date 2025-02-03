import React from 'react';
import { getSrcs } from '../../../utils/image';
import Section, { ThemeKeys } from '../../Global/Section/Section';
import s from './ImageBlock.module.scss';

export type ImageBlockProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: 'ImageBlock';
  image: ImageModel;
  theme?: ThemeKeys;
  caption: string | null;
};

type Props = Omit<ImageBlockProps, '_type'>;

const ImageBlock: React.FC<Props> = (props) => {
  const srcs = getSrcs(props.image, 375, 1020, 8, props.image.aspectRatio ?? 1);

  return (
    <Section theme={props.theme} grid={true}>
      <figure
        className={s.imageWrapper}
        style={
          {
            '--ar': props.image.aspectRatio ?? 1.6,
          } as React.CSSProperties
        }
      >
        <img
          className={s.image}
          src={srcs.src}
          srcSet={srcs.srcSet}
          alt={props.image.altText}
          loading="lazy"
          sizes={`(max-width: 767px) 100%, (max-width: 1023px) 83%, (max-width: 1599px) 66%, (max-width: 1919px) 50%, 802px`}
        />
        {props.caption ? (
          <figcaption className={s.caption}>{props.caption}</figcaption>
        ) : null}
      </figure>
    </Section>
  );
};

export default ImageBlock;
