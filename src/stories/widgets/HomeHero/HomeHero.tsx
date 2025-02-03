import React from 'react';
import g from '../../../lib/global.module.scss';
import { highlightTitleWords } from '../../../utils';
import type { CtaIconModel } from '../../../utils/icon';
import { getSrcs } from '../../../utils/image';
import type { UspModel } from '../../components/UspList/UspList';
import UspList from '../../components/UspList/UspList';
import { LinkButton } from '../../Global/Button/Button';
import Section from '../../Global/Section/Section';
import s from './HomeHero.module.scss';

export type HomeHeroProps = React.HTMLAttributes<HTMLDivElement> & {
  _type: 'homeHero';
  ctas?: CtaIconModel[];
  image: ImageModel;
  title: string;
  uspList?: UspModel[];
};

type Props = Omit<HomeHeroProps, '_type'>;

const HomeHero: React.FC<Props> = (props) => {
  const srcsMobile = getSrcs(props.image, 375, 768, 12, 1080 / 1920);
  const srcs = getSrcs(props.image, 375, 1920, 12, 1920 / 1080);

  return (
    <Section className={s.homeHero} grid={true}>
      {srcs.src ? (
        <picture className={s.bgImage}>
          <source media="(min-width:768px)" srcSet={srcs.srcSet} />
          <img
            src={srcsMobile.src}
            srcSet={srcsMobile.srcSet}
            alt={props.image.altText}
            loading="eager"
          />
        </picture>
      ) : null}
      <div className={s.contentWrapper}>
        <h1
          className={s.title}
          dangerouslySetInnerHTML={{ __html: highlightTitleWords(props.title) }}
        />

        {props.children ? (
          <div className={`${g.richText} ${s.content}`}>{props.children}</div>
        ) : null}

        {props.ctas && props.ctas.length > 0 ? (
          <div className={s.ctaBlock}>
            {props.ctas.map((cta, i) => (
              <LinkButton
                key={`home-hero-cta-${i}`}
                theme={i === 0 ? 'outline' : 'text'}
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
        <UspList id={'home-hero'} items={props.uspList} theme="default" />
      ) : null}
    </Section>
  );
};

export default HomeHero;
