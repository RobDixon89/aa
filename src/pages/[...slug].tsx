import Page from '@/lib/Page';
import { portableTextComponents } from '@/lib/portableText';
import { client } from '@/sanity/lib/client';
import {
  PageQueryResponse,
  PageResponse,
  pageSlugsQuery,
  pagesQuery,
} from '@/sanity/queries/pages';
import { SiteSettingsResponse } from '@/sanity/queries/settings';
import { LocationLink } from '@/sanity/schema/linkList';
import InnerPageBanner from '@/stories/widgets/InnerPageBanner/InnerPageBanner';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import { firstFormId } from '@/utils';
import { mapImageAttributes, mapLinkAttributes } from '@/utils/mapping';
import { GetStaticProps } from 'next';
import { PortableText } from 'next-sanity';
import { ReactElement } from 'react';

type Props = {
  settings: SiteSettingsResponse;
  page: PageResponse;
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
  const res = (await client.fetch(pageSlugsQuery)) as { slug: string }[];

  return {
    paths: res.map((page) => `/${page.slug}`),
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

  const res = (await client.fetch(pagesQuery, {
    slug: params.slug.join('/'),
  })) as PageQueryResponse;

  if (!res.page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...res,
    },
  };
};

export default function PageRoute(props: Props): ReactElement {
  let breadcrumbs = [
    {
      text: 'Home',
      url: '/',
    },
  ];

  if (props.page.parent) {
    breadcrumbs.push({
      text: props.page.parent.title,
      url: `/${props.page.parent.slug.current}`,
    });
  }

  breadcrumbs.push({
    text: props.page.title,
    url: `/${props.page.slug}`,
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
                ? props.page.parent.title
                : undefined
          }
          title={props.page.banner.title}
          ctas={
            props.page.banner.ctas !== null
              ? props.page.banner.ctas.map((cta) => mapLinkAttributes(cta))
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
          <PortableText
            value={props.page.banner.blockContent}
            components={portableTextComponents('', [], [], [], '')}
          />
        </InnerPageBanner>
      ) : null}

      {props.page.blockContent !== null ? (
        <PortableText
          value={props.page.blockContent}
          components={portableTextComponents(
            '',
            props.locations,
            props.services,
            props.settings.usps,
            firstFormId(props.page.blockContent),
            props.settings.form
          )}
        />
      ) : null}
    </Page>
  );
}
