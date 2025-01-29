import React from "react";
import g from "../../../lib/global.module.scss";
import { insertLocationName } from "../../../utils";
import Icon, { IconType } from "../../../utils/icon";
import { getSrcs } from "../../../utils/image";
import CtaBlock from "../../components/CtaBlock/CtaBlock";
import Section from "../../components/Section/Section";
import s from "./ServiceCards.module.scss";

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
  location?: string;
  ctas: CtaModel[];
};

const ServiceCards: React.FC<ServiceCardsProps> = (props) => {
  if (!props.items || props.items.length === 0) {
    return null;
  }

  const children = React.useMemo(
    () =>
      props.children
        ? insertLocationName(props.children, props.location)
        : undefined,
    []
  );

  return (
    <Section className={s.container} grid={true}>
      {props.title || children ? (
        <div className={s.contentWrapper}>
          {props.title && <h2 className={s.title}>{props.title}</h2>}
          {children ? (
            <div
              className={`${g.richText}`}
              dangerouslySetInnerHTML={{ __html: children }}
            />
          ) : null}
        </div>
      ) : null}

      <ul className={s.cards}>
        {props.items.map((service) => (
          <li key={`${props.id}-${service.id}`}>
            <a href={service.url} className={s.card}>
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
            </a>
          </li>
        ))}
      </ul>

      {props.ctas && props.ctas.length > 0 ? (
        <CtaBlock id={props.id} items={props.ctas} />
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
