import React from "react";
import g from "../../../lib/global.module.scss";
import { insertLocationName } from "../../../utils";
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
    <Section grid={true}>
      <div className={s.container}>
        {props.title && <h2 className={s.title}>{props.title}</h2>}
        {children ? (
          <div
            className={`${g.richText}`}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        ) : null}

        <ul>
          {props.items.map((service) => (
            <li key={`${props.id}-${service.id}`}>
              <a href={service.url}>
                {service.image ? (
                  <img
                    // className={s.image}
                    src={service.image.src}
                    alt={service.image.altText}
                    loading="lazy"
                  />
                ) : null}

                {service.parent ? <p>{service.parent}</p> : null}
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default ServiceCards;
