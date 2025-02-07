import { motion, useInView } from 'motion/react';
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
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 175px -50px 0px',
  });

  const srcs = getSrcs(props.image, 375, 1020, 8, props.image.aspectRatio ?? 1);

  return (
    <Section ref={ref} theme={props.theme} grid={true}>
      <motion.figure
        className={s.imageWrapper}
        style={
          {
            '--ar': props.image.aspectRatio ?? 1.6,
          } as React.CSSProperties
        }
      >
        <motion.img
          className={s.image}
          src={srcs.src}
          srcSet={srcs.srcSet}
          alt={props.image.altText}
          loading="lazy"
          sizes={`(max-width: 767px) 100%, (max-width: 1023px) 83%, (max-width: 1599px) 66%, (max-width: 1919px) 50%, 802px`}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.65 }}
        />
        {props.caption ? (
          <motion.figcaption
            className={s.caption}
            variants={{
              hidden: { y: -20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.65 }}
          >
            {props.caption}
          </motion.figcaption>
        ) : null}
      </motion.figure>
    </Section>
  );
};

export default ImageBlock;
