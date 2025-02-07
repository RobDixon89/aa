import { motion, useInView, Variants } from 'motion/react';
import Link from 'next/link';
import React from 'react';
import g from '../../../lib/global.module.scss';
import Icon, { IconType } from '../../../utils/icon';
import { getSrcs } from '../../../utils/image';
import CtaBlock from '../../Global/CtaBlock/CtaBlock';
import Section from '../../Global/Section/Section';
import s from './ServiceCards.module.scss';

export type ServiceModel = {
  id: string;
  description: string;
  image: ImageModel | null;
  name: string;
  parent?: string;
  url: string;
};

export type ServiceCardsProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  title?: string | null;
  items: ServiceModel[];

  ctas: CtaModel[];
};

const ServiceCards: React.FC<ServiceCardsProps> = (props) => {
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
    <Section ref={ref} className={s.container} grid={true}>
      {props.title || props.children ? (
        <motion.div
          className={s.contentWrapper}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ staggerChildren: 0.2 }}
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

      <motion.ul
        className={s.cards}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.2, delay: 0.85 }}
      >
        {props.items.map((service) => (
          <motion.li key={`${props.id}-${service.id}`} variants={variants}>
            <Link href={service.url} className={s.card}>
              {service.image ? renderCardImage(service.image) : null}
              <div className={s.cardContent}>
                {service.parent ? (
                  <p className={g.subtitle}>{service.parent}</p>
                ) : null}
                <h3>{service.name}</h3>
                <div className={s.descriptionWrapper}>
                  <p>{service.description} </p> <Icon icon={IconType.arrow} />
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

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

  function renderCardImage(image: ImageModel): React.ReactNode {
    const srcs = getSrcs(image, 375, 525, 6, 566 / 230);

    return (
      <div className={s.imageWrapper}>
        <img
          className={s.image}
          src={srcs.src}
          srcSet={srcs.srcSet}
          alt={image.altText}
          loading="lazy"
          sizes={`(max-width: 567px) 100%, (max-width: 1023px) 50%, (max-width: 1920px) 33%, 525px`}
        />
      </div>
    );
  }
};

export default ServiceCards;
