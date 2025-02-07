import { motion, useInView, Variants } from 'motion/react';
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
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 175px -50px 0px',
  });

  if (!props.items || props.items.length === 0) {
    return null;
  }

  const variants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Section
      ref={ref}
      className={s.container}
      grid={true}
      theme={props.theme}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.65,
      }}
    >
      {props.title || props.children ? (
        <motion.div
          className={s.contentWrapper}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ staggerChildren: 0.2, delay: 0.35 }}
        >
          {props.title && (
            <motion.h2 className={s.title} variants={variants}>
              {props.title}
            </motion.h2>
          )}
          {props.children ? (
            <motion.div className={`${g.richText}`} variants={variants}>
              {props.children}
            </motion.div>
          ) : null}
        </motion.div>
      ) : null}

      <motion.ol
        className={s.cards}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.2 }}
      >
        {props.items.map((item) => (
          <React.Fragment key={`${props.id}-${item.id}`}>
            {item._type === 'step' ? (
              <motion.li
                data-theme={item.theme}
                className={`${g.richText}`}
                variants={variants}
              >
                {item.content}
              </motion.li>
            ) : (
              <motion.li variants={variants}>
                {renderStepImage(item.image, item.imageType)}
              </motion.li>
            )}
          </React.Fragment>
        ))}
      </motion.ol>

      {props.ctas && props.ctas.length > 0 ? (
        <CtaBlock
          id={props.id}
          items={props.ctas}
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: props.items.length * 0.175 }}
        />
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
