import React from 'react';
import g from '../../../lib/global.module.scss';
import type { CtaIconModel } from '../../../utils/icon';
import { getSrcs } from '../../../utils/image';
import CtaBlock from '../../components/CtaBlock/CtaBlock';
import Section, { Themes } from '../../components/Section/Section';
import s from './ImageText5050.module.scss';

export type ImageText5050Props = React.HTMLAttributes<HTMLDivElement> & {
  _type: 'ImageText5050';
  id: string;
  ctas?: CtaIconModel[];
  image: ImageModel;
  title?: string | null;
  theme?: Exclude<Themes, Themes.navy>;
  imageAlign: 'left' | 'right';
  location?: string;
};

type Props = Omit<ImageText5050Props, '_type'>;

const ImageText5050: React.FC<Props> = (props) => {
  const srcsMobile = getSrcs(props.image, 375, 1024, 6, 327 / 225);
  const srcs = getSrcs(props.image, 480, 802, 3, 864 / 508);

  if (!props.children) {
    return null;
  }

  return (
    <Section
      className={s.container}
      theme={props.theme}
      data-img-align={props.imageAlign}
      grid={true}
    >
      <div className={s.imageWrapper}>
        <picture>
          <source
            media="(min-width:768px)"
            srcSet={srcs.srcSet}
            sizes={`(max-width: 1920px) 50%, 802px`}
          />
          <img
            className={s.image}
            src={srcsMobile.src}
            srcSet={srcsMobile.srcSet}
            alt={props.image.altText}
            loading="eager"
          />
        </picture>
      </div>

      <div className={s.contentWrapper}>
        {props.title ? <h2 className={s.title}>{props.title}</h2> : null}

        <div className={`${g.richText}`}>{props.children}</div>

        {props.ctas && props.ctas.length > 0 ? (
          <CtaBlock id={props.id} items={props.ctas} />
        ) : null}
      </div>
    </Section>
  );
};

export default ImageText5050;
