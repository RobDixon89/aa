import { motion, useInView, Variants } from 'motion/react';
import React from 'react';
import g from '../../../lib/global.module.scss';
import type { CtaIconModel } from '../../../utils/icon';
import { getSrcs } from '../../../utils/image';
import CtaBlock from '../../Global/CtaBlock/CtaBlock';
import Section, { ThemeKeys } from '../../Global/Section/Section';
import s from './ImageText5050.module.scss';

export type ImageText5050Props = React.HTMLAttributes<HTMLDivElement> & {
  _type: 'ImageText5050';
  id: string;
  ctas?: CtaIconModel[];
  image: ImageModel;
  title?: string | null;
  theme?: ThemeKeys;
  imageAlign: 'left' | 'right';
};

type Props = Omit<ImageText5050Props, '_type'>;

const ImageText5050: React.FC<Props> = (props) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 175px -50px 0px',
  });

  const srcsMobile = getSrcs(props.image, 375, 1024, 6, 327 / 225);
  const srcs = getSrcs(props.image, 480, 802, 3, 864 / 508);

  const textVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (!props.children) {
    return null;
  }

  return (
    <Section
      ref={ref}
      className={s.container}
      theme={props.theme}
      data-img-align={props.imageAlign}
      grid={true}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.65,
      }}
    >
      <motion.div
        className={s.imageWrapper}
        variants={{
          hidden: {
            opacity: 0,
            x: props.imageAlign === 'right' ? '20%' : '-20%',
          },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          delay: 0.3,
          duration: 0.75,
          type: 'spring',
          bounce: 0.35,
        }}
      >
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
      </motion.div>

      <motion.div
        className={s.contentWrapper}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.2, delay: 0.5 }}
      >
        {props.title ? (
          <motion.h2 className={s.title} variants={textVariants}>
            {props.title}
          </motion.h2>
        ) : null}

        <motion.div className={`${g.richText}`} variants={textVariants}>
          {props.children}
        </motion.div>

        {props.ctas && props.ctas.length > 0 ? (
          <CtaBlock id={props.id} items={props.ctas} variants={textVariants} />
        ) : null}
      </motion.div>
    </Section>
  );
};

export default ImageText5050;
