import Page from '@/lib/Page';
import { portableTextComponents } from '@/lib/portableText';
import { client } from '@/sanity/lib/client';
import {
  locationInnerPagesQuery,
  LocationInnerPagesQueryResponse,
  LocationInnerTemplateResponse,
  locationSlugsQuery,
} from '@/sanity/queries/locations';
import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { LocationLink } from '@/sanity/schema/linkList';
import InnerPageBanner from '@/stories/widgets/InnerPageBanner/InnerPageBanner';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import { firstFormId } from '@/utils';
import {
  getLocationLinkUrl,
  mapImageAttributes,
  mapLinkAttributes,
} from '@/utils/mapping';
import { GetStaticProps } from 'next';
import { PortableText } from 'next-sanity';
import { ReactElement } from 'react';

type Props = {
  slug: string;
  settings: SiteSettingsResponse;
  location: LocationLink;
  template: LocationInnerTemplateResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};

type Query = {
  [key: string]: string[];
};

export const getStaticPaths = async (): Promise<{
  paths: string[];
  fallback: boolean;
}> => {
  const res = (await client.fetch(locationSlugsQuery)) as {
    name: string;
  }[];

  return {
    paths: res.map((loc) => getLocationLinkUrl(loc as LocationLink)),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params = {},
}) => {
  if (!params.slug) {
    return {
      notFound: true,
    };
  }

  const res = (await client.fetch(
    locationInnerPagesQuery
  )) as LocationInnerPagesQueryResponse;

  const location = res.locations.find(
    (loc) => loc.name.toLowerCase().replaceAll(/\W+/g, '-') === params.slug[0]
  );

  if (!location) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: params.slug.join('/'),
      ...res,
      location,
    },
  };
};

export default function PageRoute(props: Props): ReactElement {
  return (
    <Page
      title={
        props.template.metaTitle
          ? props.template.metaTitle
          : props.location.name
      }
      description={props.template.metaDescription}
      image={props.template.metaImage}
      settings={props.settings}
      locations={props.locations}
      services={props.services}
    >
      {props.template.banner ? (
        <InnerPageBanner
          breadcrumbs={[
            {
              text: 'Home',
              url: '/',
            },
            {
              text: 'Areas We Cover',
              url: '/locations/',
            },
            {
              text: props.location.name,
              url: `/locations/${props.slug}`,
            },
          ]}
          subtitle={
            props.template.banner.subtitle
              ? props.template.banner.subtitle
              : props.location.area
          }
          title={props.template.banner.title.replaceAll(
            '##location##',
            props.location.name
          )}
          ctas={
            props.template.banner.ctas !== null
              ? props.template.banner.ctas.map((cta) =>
                  mapLinkAttributes(cta, props.location.name)
                )
              : []
          }
          image={
            props.template.banner.image
              ? mapImageAttributes(props.template.banner.image)
              : undefined
          }
          uspList={props.template.banner.usps ? props.settings.usps : []}
          theme={props.template.banner.theme}
        >
          <PortableText
            value={props.template.banner.blockContent}
            components={portableTextComponents(
              props.location.name,
              [],
              [],
              [],
              ''
            )}
          />
        </InnerPageBanner>
      ) : null}

      {props.template.blockContent !== null ? (
        <PortableText
          value={props.template.blockContent}
          components={portableTextComponents(
            props.location.name,
            props.locations,
            props.services,
            props.settings.usps,
            firstFormId(props.template.blockContent),
            props.settings.form
          )}
        />
      ) : null}
    </Page>
  );
}
