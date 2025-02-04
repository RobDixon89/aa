import React from 'react';
import g from '../../../lib/global.module.scss';
import { getSrcs } from '../../../utils/image';
import CtaBlock from '../../Global/CtaBlock/CtaBlock';
import Section, { ThemeKeys } from '../../Global/Section/Section';
import s from './Steps.module.scss';

export type StepCardModel = {
  _type: 'step';
  id: string;
  content: React.ReactNode;
  theme: ThemeKeys;
};

export type ImageCardModel = {
  _type: 'stepImage';
  id: string;
  image: ImageModel;
  imageType: 'contain' | 'cover';
};

export type StepsProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  title?: string;
  items: (StepCardModel | ImageCardModel)[];
  ctas: CtaModel[];
  theme: ThemeKeys;
};

const Steps: React.FC<StepsProps> = (props) => {
  if (!props.items || props.items.length === 0) {
    return null;
  }

  return (
    <Section className={s.container} grid={true} theme={props.theme}>
      <div className={s.contentWrapper}>
        {props.title && <h2 className={s.title}>{props.title}</h2>}
        {props.children ? (
          <div className={`${g.richText}`}>{props.children}</div>
        ) : null}
      </div>

      <ol className={s.cards}>
        {props.items.map((item) => (
          <React.Fragment key={`${props.id}-${item.id}`}>
            {item._type === 'step' ? (
              <li data-theme={item.theme} className={`${g.richText}`}>
                {item.content}
              </li>
            ) : (
              <li>{renderStepImage(item.image, item.imageType)}</li>
            )}
          </React.Fragment>
        ))}
      </ol>

      {props.ctas && props.ctas.length > 0 ? (
        <CtaBlock id={props.id} items={props.ctas} />
      ) : null}
    </Section>
  );

  function renderStepImage(
    image: ImageModel,
    type: 'cover' | 'contain'
  ): React.ReactNode {
    const srcs = getSrcs(image, 216, 350, 3, 350 / 220);

    return (
      <img
        className={s.image}
        src={srcs.src}
        srcSet={srcs.srcSet}
        alt={image.altText}
        loading="lazy"
        style={{ objectFit: type }}
        sizes={`(max-width: 476px) 100%, (max-width: 767px) 50%, (max-width: 1365px) 33%, 350px`}
      />
    );
  }
};

export default Steps;
