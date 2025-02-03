import Page from '@/lib/Page';
import { portableTextComponents } from '@/lib/portableText';
import { client } from '@/sanity/lib/client';
import { PageResponse } from '@/sanity/queries/pages';
import {
  servicePagesQuery,
  ServicePagesQueryResponse,
  serviceSlugsQuery,
  ServiceSlugsResponse,
} from '@/sanity/queries/services';
import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { LocationLink, ServiceLink } from '@/sanity/schema/linkList';
import InnerPageBanner from '@/stories/widgets/InnerPageBanner/InnerPageBanner';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import { firstFormId } from '@/utils';
import {
  getServiceLinkUrl,
  mapImageAttributes,
  mapLinkAttributes,
} from '@/utils/mapping';
import { GetStaticProps } from 'next';
import { PortableText } from 'next-sanity';
import { ReactElement } from 'react';

type ServicePageResponse = Omit<PageResponse, '_type' | 'parent'> & {
  _type: 'service' | 'location';
  parent: string | null;
  serviceLink: ServiceLink;
  locationName: string;
};

type Props = {
  slug: string;
  settings: SiteSettingsResponse;
  page: ServicePageResponse;
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
  const res = (await client.fetch(serviceSlugsQuery)) as ServiceSlugsResponse;

  let locations: string[] = [];
  const services: string[] = res.services.map((service) => {
    // Create link from service
    const serviceLink: ServiceLink = {
      _type: 'service',
      title: service.title,
      parent: service.parent,
    };

    // Map all location children page slugs for this service
    res.locations.map((location) => {
      locations.push(
        `/services${getServiceLinkUrl(serviceLink, location.name, true)}`
      );
    });

    return `/services${getServiceLinkUrl(serviceLink, undefined, true)}`;
  });

  const paths = services.concat(locations);

  return {
    paths,
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
    servicePagesQuery
  )) as ServicePagesQueryResponse;

  const location = res.locations.find(
    (loc) =>
      loc.name.toLowerCase().replaceAll(/\W+/g, '-') ===
      params.slug[params.slug.length - 1]
  );

  const serviceCards: ServiceCardResponse[] = res.services.map((service) => ({
    _type: 'service',
    _id: service._id,
    _createdAt: service._createdAt,
    parent: service.parent,
    title: service.title,
    description: service.description,
    bannerImage: service.landing.banner?.image ?? null,
    metaImage: service.landing.metaImage,
  }));

  const service = res.services.find(
    (s) =>
      s.title.toLowerCase().replaceAll(/\W+/g, '-') ===
      params.slug[params.slug.length - (location ? 2 : 1)]
  );

  if (!service) {
    return {
      notFound: true,
    };
  }

  const serviceLink: ServiceLink = {
    _type: 'service',
    title: service.title,
    parent: service.parent,
  };

  const page: ServicePageResponse = location
    ? {
        _type: 'location',
        _id: `${service._id}-${location.name.toLowerCase().replaceAll(/\W+/g, '-')}`,
        _createdAt: service._createdAt,
        _updatedAt: service._updatedAt,
        slug: getServiceLinkUrl(serviceLink, location.name, true).substring(1),
        title: `${service.title} in ${location.name}`,
        parent: location.area,
        ...service.location,
        serviceLink: serviceLink,
        locationName: location.name,
      }
    : {
        _type: 'service',
        _id: service._id,
        _createdAt: service._createdAt,
        _updatedAt: service._updatedAt,
        slug: getServiceLinkUrl(serviceLink, undefined, true).substring(1),
        parent: service.parent ? service.parent : null,
        title: service.title,
        ...service.landing,
        serviceLink: serviceLink,
        locationName: '',
      };

  return {
    props: {
      slug: params.slug.join('/'),
      page,
      locations: res.locations,
      settings: res.settings,
      services: serviceCards,
    },
  };
};

export default function PageRoute(props: Props): ReactElement {
  let breadcrumbs = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Services',
      url: '/services/',
    },
  ];

  if (props.page.parent && props.page._type === 'service') {
    breadcrumbs.push({
      text: props.page.parent,
      url: getServiceLinkUrl(
        {
          _type: 'service',
          title: props.page.parent,
          parent: null,
        },
        undefined
      ),
    });
  }

  if (props.page._type === 'location') {
    breadcrumbs.push({
      text: props.page.serviceLink.title,
      url: getServiceLinkUrl(props.page.serviceLink, undefined),
    });
  }

  breadcrumbs.push({
    text: props.page.title,
    url: `/services/${props.slug}`,
  });

  return (
    <Page
      title={props.page.metaTitle ? props.page.metaTitle : props.page.title}
      description={props.page.metaDescription}
      image={props.page.metaImage}
      settings={props.settings}
      locations={props.locations}
      services={props.services}
    >
      {props.page.banner ? (
        <InnerPageBanner
          breadcrumbs={breadcrumbs}
          subtitle={
            props.page.banner.subtitle
              ? props.page.banner.subtitle
              : props.page.parent
                ? props.page.parent
                : undefined
          }
          title={props.page.banner.title.replaceAll(
            '##location##',
            props.page.locationName
          )}
          ctas={
            props.page.banner.ctas !== null
              ? props.page.banner.ctas.map((cta) =>
                  mapLinkAttributes(cta, props.page.locationName)
                )
              : []
          }
          image={
            props.page.banner.image
              ? mapImageAttributes(props.page.banner.image)
              : undefined
          }
          uspList={props.page.banner.usps ? props.settings.usps : []}
          theme={props.page.banner.theme}
        >
          {props.page.banner.blockContent !== null ? (
            <PortableText
              value={props.page.banner.blockContent}
              components={portableTextComponents(
                props.page.locationName,
                [],
                [],
                [],
                ''
              )}
            />
          ) : null}
        </InnerPageBanner>
      ) : null}

      {props.page.blockContent !== null ? (
        <PortableText
          value={props.page.blockContent}
          components={portableTextComponents(
            props.page.locationName,
            props.locations,
            props.services,
            props.settings.usps,
            firstFormId(props.page.blockContent),
            props.page.serviceLink
          )}
        />
      ) : null}
    </Page>
  );
}
