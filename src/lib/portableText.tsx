import { LocationLink, ServiceLink } from '@/sanity/schema/linkList';
import { UspModel } from '@/stories/components/UspList/UspList';
import EmbeddedForm from '@/stories/widgets/EmbeddedForm/EmbeddedForm';
import { EmbeddedFormResponse } from '@/stories/widgets/EmbeddedForm/schema';
import Faqs from '@/stories/widgets/FAQs/FAQs';
import { FaqsResponse } from '@/stories/widgets/FAQs/schema';
import ImageBlock from '@/stories/widgets/ImageBlock/ImageBlock';
import { ImageBlockResponse } from '@/stories/widgets/ImageBlock/schema';
import ImageText5050 from '@/stories/widgets/ImageText5050/ImageText5050';
import { ImageText5050Response } from '@/stories/widgets/ImageText5050/schema';
import RichText from '@/stories/widgets/RichText/RichText';
import {
  LocationListResponse,
  RichTextResponse,
} from '@/stories/widgets/RichText/schema';
import {
  ServiceCardResponse,
  ServiceCardsResponse,
} from '@/stories/widgets/ServiceCards/schema';
import ServiceCards from '@/stories/widgets/ServiceCards/ServiceCards';
import { StepsResponse } from '@/stories/widgets/Steps/schema';
import Steps from '@/stories/widgets/Steps/Steps';
import { insertLocationName } from '@/utils';
import {
  CONTACTFORM_ID,
  getLocationLinkUrl,
  getServiceLinkUrl,
  mapImageAttributes,
  mapLinkAttributes,
  mapServiceCardAttributes,
  mapStepAttributes,
} from '@/utils/mapping';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';

export function portableTextComponents(
  locationName: string,
  locations: LocationLink[],
  services: ServiceCardResponse[],
  usps: UspModel[],
  firstFormId: string,
  service?: ServiceLink
): Partial<PortableTextReactComponents> {
  return {
    list: {
      number: ({ children }) => <ol>{children}</ol>,
      bullet: ({ children }) => <ul>{children}</ul>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li>{doLocationReplace(children, locationName)}</li>
      ),
      number: ({ children }) => (
        <li>{doLocationReplace(children, locationName)}</li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong>{doLocationReplace(children, locationName)}</strong>
      ),
      em: ({ children }) => (
        <em>{doLocationReplace(children, locationName)}</em>
      ),
      contentLink: ({ children, value }) => {
        const linkAttrs = mapLinkAttributes(value, locationName);

        return (
          <a href={linkAttrs.url} target={linkAttrs.target}>
            {doLocationReplace(children, locationName)}
          </a>
        );
      },
    },
    block: {
      normal: ({ children }) => (
        <p>{doLocationReplace(children, locationName)}</p>
      ),
      large: ({ children }) => (
        <p className="large">{doLocationReplace(children, locationName)}</p>
      ),
      small: ({ children }) => (
        <p className="small">{doLocationReplace(children, locationName)}</p>
      ),
      subtitle: ({ children }) => (
        <p>{doLocationReplace(children, locationName)}</p>
      ),
      h3: ({ children }) => (
        <h3>{doLocationReplace(children, locationName)}</h3>
      ),
      h4: ({ children }) => (
        <h4>{doLocationReplace(children, locationName)}</h4>
      ),
      blockquote: ({ children }) => (
        <blockquote>{doLocationReplace(children, locationName)}</blockquote>
      ),
      span: ({ children }) => (
        <span>{doLocationReplace(children, locationName)}</span>
      ),
    },

    // Widgets
    types: {
      embeddedForm: ({ value: w }: { value: EmbeddedFormResponse }) => (
        <EmbeddedForm
          id={firstFormId === w._key ? CONTACTFORM_ID : (w._key as string)}
          title={
            w.title
              ? w.title.replaceAll('##location##', locationName ?? '')
              : undefined
          }
          location={locationName}
        >
          {w.blockContent !== null ? (
            <PortableText
              value={w.blockContent}
              components={portableTextComponents(locationName, [], [], [], '')}
            />
          ) : null}
        </EmbeddedForm>
      ),
      faqs: ({ value: w }: { value: FaqsResponse }) => (
        <Faqs
          id={w._key}
          title={
            w.title
              ? w.title.replaceAll('##location##', locationName ?? '')
              : undefined
          }
          items={w.items?.map((item) => ({
            id: item._key,
            question: item.question,
            answer:
              item.answer !== null ? (
                <PortableText
                  value={item.answer}
                  components={portableTextComponents(
                    locationName,
                    [],
                    [],
                    [],
                    ''
                  )}
                />
              ) : null,
            ctas:
              item.ctas !== null
                ? item.ctas.map((cta) => mapLinkAttributes(cta, locationName))
                : [],
          }))}
          variant={w.variant ? w.variant : 'default'}
          location={locationName}
        />
      ),
      imageBlock: ({ value: w }: { value: ImageBlockResponse }) => {
        const [width, height] = w.image.imageUrl.match(
          // @ts-ignore
          /(\d{1,})(?=\.|\x)/g
        ) as string[];

        return (
          <ImageBlock
            id={w._key}
            image={{
              ...mapImageAttributes(w.image),
              aspectRatio: Number(width) / Number(height),
            }}
            caption={w.caption}
            theme={w.theme}
          />
        );
      },
      imageText5050: ({ value: w }: { value: ImageText5050Response }) => (
        <ImageText5050
          id={w._key}
          title={
            w.title
              ? w.title.replaceAll('##location##', locationName ?? '')
              : undefined
          }
          image={mapImageAttributes(w.image)}
          imageAlign={w.imageAlign}
          ctas={
            w.ctas !== null
              ? w.ctas.map((cta) => mapLinkAttributes(cta, locationName))
              : []
          }
          theme={w.theme}
          location={locationName}
        >
          {w.blockContent !== null ? (
            <PortableText
              value={w.blockContent}
              components={portableTextComponents(locationName, [], [], [], '')}
            />
          ) : null}
        </ImageText5050>
      ),
      locationList: ({ value: w }: { value: LocationListResponse }) => (
        <RichText
          id={w._key}
          title={
            w.title
              ? w.title.replaceAll('##location##', locationName ?? '')
              : undefined
          }
          columns={true}
          alignment="center"
          ctas={[]}
          theme={null}
        >
          <ul>
            {locations
              .filter(
                (location) => !locationName || location.name !== locationName
              )
              .sort((a, b) =>
                a.name.toLowerCase() < b.name.toLowerCase()
                  ? -1
                  : a.name.toLowerCase() > b.name.toLowerCase()
                    ? 1
                    : 0
              )
              .map((location) => (
                <li
                  key={`${w._key}-l-${location.name.toLowerCase().replaceAll(/\W+/g, '-')}`}
                >
                  <a
                    href={
                      service
                        ? getServiceLinkUrl(
                            service as ServiceLink,
                            location.name
                          )
                        : getLocationLinkUrl(location as LocationLink)
                    }
                  >
                    {location.name}
                  </a>
                </li>
              ))}
          </ul>
        </RichText>
      ),
      richText: ({ value: w }: { value: RichTextResponse }) => (
        <RichText
          id={w._key}
          title={
            w.title
              ? w.title.replaceAll('##location##', locationName ?? '')
              : undefined
          }
          alignment={w.alignment ? w.alignment : 'left'}
          ctas={
            w.ctas !== null
              ? w.ctas.map((cta) => mapLinkAttributes(cta, locationName))
              : []
          }
          uspList={w.usps ? usps : []}
          theme={w.theme}
          location={locationName}
        >
          {w.blockContent !== null ? (
            <PortableText
              value={w.blockContent}
              components={portableTextComponents(locationName, [], [], [], '')}
            />
          ) : null}
        </RichText>
      ),
      serviceCards: ({ value: w }: { value: ServiceCardsResponse }) => {
        let items;

        if (!service || w.items !== null) {
          items =
            w.items !== null
              ? w.items
              : w.serviceTypes === 'parent'
                ? services.filter((s) => !s.parent)
                : services;
        } else {
          items =
            w.serviceTypes === 'parent'
              ? services.filter((s) => !s.parent && s.title !== service.title)
              : w.serviceTypes === 'children'
                ? services.filter((s) => s.parent && s.parent === service.title)
                : services.filter((s) => s.title !== service.title);
        }

        return (
          <ServiceCards
            id={w._key}
            title={
              w.title
                ? w.title.replaceAll('##location##', locationName ?? '')
                : undefined
            }
            items={items.map((item) =>
              mapServiceCardAttributes(item, locationName)
            )}
            ctas={
              w.ctas !== null
                ? w.ctas.map((cta) => mapLinkAttributes(cta, locationName))
                : []
            }
            location={locationName}
          >
            {w.blockContent !== null ? (
              <PortableText
                value={w.blockContent}
                components={portableTextComponents(
                  locationName,
                  [],
                  [],
                  [],
                  ''
                )}
              />
            ) : null}
          </ServiceCards>
        );
      },
      steps: ({ value: w }: { value: StepsResponse }) => (
        <Steps
          id={w._key}
          title={
            w.title
              ? w.title.replaceAll('##location##', locationName ?? '')
              : undefined
          }
          items={w.items.map((item) => mapStepAttributes(item, locationName))}
          ctas={
            w.ctas !== null ? w.ctas.map((cta) => mapLinkAttributes(cta)) : []
          }
          location={locationName}
          theme={w.theme}
        >
          {w.blockContent !== null ? (
            <PortableText
              value={w.blockContent}
              components={portableTextComponents(locationName, [], [], [], '')}
            />
          ) : null}
        </Steps>
      ),
      undefined: () => null,
    },
  };
}

const doLocationReplace = (
  children: any,
  locationName: string
): React.ReactNode[] =>
  children?.map((c: any) =>
    typeof c === 'string' ? insertLocationName(c, locationName) : c
  );
