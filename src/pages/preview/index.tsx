import Page from '@/lib/Page';
import { portableTextComponents } from '@/lib/portableText';
import { client } from '@/sanity/lib/client';
import {
  homepageQuery,
  HomepageQueryResponse,
} from '@/sanity/queries/homepage';
import {
  locationInnerPagesQuery,
  LocationInnerPagesQueryResponse,
  locationLandingPageQuery,
  LocationLandingPageQueryResponse,
} from '@/sanity/queries/locations';
import { PageQueryResponse, pagesQuery } from '@/sanity/queries/pages';
import {
  serviceLandingPageQuery,
  ServiceLandingPageQueryResponse,
  servicePagesQuery,
  ServicePagesQueryResponse,
} from '@/sanity/queries/services';
import {
  LabelledLink,
  LocationLink,
  ServiceLink,
} from '@/sanity/schema/linkList';
import Button from '@/stories/Global/Button/Button';
import HomeHero from '@/stories/widgets/HomeHero/HomeHero';
import InnerPageBanner from '@/stories/widgets/InnerPageBanner/InnerPageBanner';
import { ServiceCardResponse } from '@/stories/widgets/ServiceCards/schema';
import { firstFormId } from '@/utils';
import {
  getServiceLinkUrl,
  mapImageAttributes,
  mapLinkAttributes,
} from '@/utils/mapping';
import { PortableText } from 'next-sanity';
import React, { ReactElement } from 'react';

export default function IndexRoute(): ReactElement {
  const [type, setType] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any | undefined>(undefined);
  const [breadcrumbs, setBreadcrumbs] = React.useState<CtaModel[]>([]);

  return (
    <Page
      title={'Preview Page'}
      description={''}
      image={null}
      settings={undefined}
      locations={[]}
      services={[]}
    >
      <h1 style={{ margin: 20 }}>Page Content Preview</h1>
      <div
        style={{ margin: 20, display: 'flex', gap: 12, alignItems: 'flex-end' }}
      >
        <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
          <label>Page Type</label>
          <select
            onChange={(e) => setType(e.target.value)}
            style={{ height: 24 }}
            disabled={loading}
          >
            <option>Page Type</option>
            <option value="homepage">Homepage</option>
            <option value="page">Inner Page</option>
            <option value="service-landing">Service Landing</option>
            <option value="service">Service</option>
            <option value="service-location">Service Location</option>
            <option value="location-landing">Location Landing</option>
            <option value="location">Location</option>
          </select>
        </div>
        {type &&
        ['page', 'service', 'service-location', 'location'].includes(type) ? (
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <label style={{ textTransform: 'capitalize' }}>
              {type === 'page' ? (
                <>Slug</>
              ) : (
                <>{type.replaceAll('-location', '')} Name</>
              )}
              :
            </label>
            <input
              id="sanity-name"
              type="text"
              name="sanity-name"
              style={{ height: 24 }}
              disabled={loading}
            />
          </div>
        ) : null}

        {type === 'service-location' ? (
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <label style={{ textTransform: 'capitalize' }}>
              Location Name:
            </label>
            <input
              id="sanity-loc"
              type="text"
              name="sanity-loc"
              style={{ height: 24 }}
              disabled={loading}
            />
          </div>
        ) : null}

        <div
          style={{
            marginLeft: 'auto',
            pointerEvents: loading ? 'none' : 'auto',
            opacity: loading ? 0.8 : 1,
          }}
        >
          <Button
            theme="default"
            label={loading ? 'Loading' : 'Preview'}
            onClick={getPreview}
          />
        </div>
      </div>

      {data ? (
        <>
          {data._type === 'homepage' && data.template.banner ? (
            <HomeHero
              image={mapImageAttributes(data.template.banner.image)}
              title={data.template.banner.title}
              ctas={
                data.template.banner.ctas !== null
                  ? data.template.banner.ctas.map((cta: LabelledLink) =>
                      mapLinkAttributes(cta)
                    )
                  : []
              }
              uspList={data.template.banner.usps ? data.settings.usps : []}
            >
              {data.template.banner.blockContent !== null ? (
                <PortableText
                  value={data.template.banner.blockContent}
                  components={portableTextComponents('', [], [], [], '')}
                />
              ) : null}
            </HomeHero>
          ) : data.template.banner ? (
            <InnerPageBanner
              breadcrumbs={breadcrumbs}
              subtitle={
                data.template.banner.subtitle
                  ? data.template.banner.subtitle
                  : undefined
              }
              title={data.template.banner.title.replaceAll(
                '##location##',
                data._type === 'locationService'
                  ? data.template.locationName
                  : data._type === 'location'
                    ? data.location.name
                    : '##location##'
              )}
              ctas={
                data.template.banner.ctas !== null
                  ? data.template.banner.ctas.map((cta: LabelledLink) =>
                      mapLinkAttributes(cta)
                    )
                  : []
              }
              uspList={data.template.banner.usps ? data.settings.usps : []}
              theme={data.template.banner.theme}
            >
              {data.template.banner.blockContent !== null ? (
                <PortableText
                  value={data.template.banner.blockContent}
                  components={portableTextComponents(
                    data._type === 'locationService'
                      ? data.template.locationName
                      : data._type === 'location'
                        ? data.location.name
                        : '',
                    [],
                    [],
                    [],
                    ''
                  )}
                />
              ) : null}
            </InnerPageBanner>
          ) : null}

          {data.template.blockContent !== null ? (
            <PortableText
              value={data.template.blockContent}
              components={portableTextComponents(
                data._type === 'locationService'
                  ? data.template.locationName
                  : data._type === 'location'
                    ? data.location.name
                    : '',
                data.locations,
                data.services,
                data.settings.usps,
                firstFormId(data.template.blockContent),
                data._type === 'service'
                  ? {
                      _type: 'service',
                      title: data.template.title,
                      parent: data.template.parent,
                    }
                  : undefined
              )}
            />
          ) : null}

          {!data.template?.banner && !data.template?.blockContent ? (
            <p style={{ margin: 20 }}>No page content found</p>
          ) : null}
        </>
      ) : null}
    </Page>
  );

  async function getPreview(): Promise<void> {
    setLoading(true);
    setBreadcrumbs([]);

    let res;
    const nameValue = (
      document.getElementById('sanity-name') as HTMLInputElement
    )?.value;
    const locationValue = (
      document.getElementById('sanity-loc') as HTMLInputElement
    )?.value;

    switch (type) {
      case 'homepage':
        res = (await client.fetch(homepageQuery)) as HomepageQueryResponse;

        setData({
          _type: 'homepage',
          ...res,
        });

        break;

      case 'service-landing':
        res = (await client.fetch(
          serviceLandingPageQuery
        )) as ServiceLandingPageQueryResponse;

        setData({
          _type: 'serviceLanding',
          ...res,
        });
        setBreadcrumbs([
          {
            text: 'Home',
            url: '/',
          },
          {
            text: res.template.title,
            url: `/services`,
          },
        ]);
        break;

      case 'service':
      case 'service-location':
        res = (await client.fetch(
          servicePagesQuery
        )) as ServicePagesQueryResponse;

        const serviceCards: ServiceCardResponse[] = res.services.map(
          (service) => ({
            _type: 'service',
            _id: service._id,
            _createdAt: service._createdAt,
            parent: service.parent,
            title: service.title,
            description: service.description,
            bannerImage: service.landing.banner?.image ?? null,
            metaImage: service.landing.metaImage,
          })
        );

        const service = res.services.find(
          (s) =>
            s.title.toLowerCase().replaceAll(/\W+/g, '-') ===
            nameValue.toLowerCase().replaceAll(/\W+/g, '-')
        );

        if (!service) {
          setData({
            _type: 'service',
            template: undefined,
          });
        } else {
          const serviceLocation = res.locations.find(
            (loc) =>
              loc.name.toLowerCase().replaceAll(/\W+/g, '-') ===
              locationValue.toLowerCase().replaceAll(/\W+/g, '-')
          ) as LocationLink;

          const serviceLink: ServiceLink = {
            _type: 'service',
            title: service.title,
            parent: service.parent,
          };

          const template = serviceLocation
            ? {
                _type: 'location',
                _id: `${service._id}-${serviceLocation.name.toLowerCase().replaceAll(/\W+/g, '-')}`,
                _createdAt: service._createdAt,
                _updatedAt: service._updatedAt,
                slug: getServiceLinkUrl(
                  serviceLink,
                  serviceLocation.name,
                  true
                ).substring(1),
                title: `${service.title} in ${serviceLocation.name}`,
                parent: serviceLocation.area,
                ...service.location,
                serviceLink: serviceLink,
                locationName: serviceLocation.name,
                banner: service.location.banner
                  ? {
                      ...service.location.banner,
                      subtitle: service.location.banner?.subtitle
                        ? service.location.banner.subtitle.replaceAll(
                            '##location##',
                            serviceLocation.name
                          )
                        : serviceLocation.area,
                    }
                  : null,
              }
            : {
                _type: 'service',
                _id: service._id,
                _createdAt: service._createdAt,
                _updatedAt: service._updatedAt,
                slug: getServiceLinkUrl(serviceLink, undefined, true).substring(
                  1
                ),
                parent: service.parent ? service.parent : null,
                title: service.title,
                ...service.landing,
                serviceLink: serviceLink,
                locationName: '',
                banner: service.landing.banner
                  ? {
                      ...service.landing.banner,
                      subtitle: service.landing.banner?.subtitle
                        ? service.landing.banner?.subtitle
                        : service.parent
                          ? service.parent
                          : null,
                    }
                  : null,
              };

          let bc = [
            {
              text: 'Home',
              url: '/',
            },
            {
              text: 'Services',
              url: '/services/',
            },
          ];

          if (template.parent && template._type === 'service') {
            bc.push({
              text: template.parent,
              url: getServiceLinkUrl(
                {
                  _type: 'service',
                  title: template.parent,
                  parent: null,
                },
                undefined
              ),
            });
          }

          if (template._type === 'location') {
            bc.push({
              text: template.serviceLink.title,
              url: getServiceLinkUrl(template.serviceLink, undefined),
            });
          }

          bc.push({
            text: template.title,
            url: `/services/${template.slug}`,
          });

          setData({
            _type: serviceLocation ? 'locationService' : 'service',
            template,
            locations: res.locations,
            settings: res.settings,
            services: serviceCards,
          });
          setBreadcrumbs(bc);
        }

        break;

      case 'location-landing':
        res = (await client.fetch(
          locationLandingPageQuery
        )) as LocationLandingPageQueryResponse;

        setData({
          _type: 'locationLanding',
          ...res,
        });
        setBreadcrumbs([
          {
            text: 'Home',
            url: '/',
          },
          {
            text: res.template.title,
            url: `/locations`,
          },
        ]);
        break;

      case 'location':
        res = (await client.fetch(
          locationInnerPagesQuery
        )) as LocationInnerPagesQueryResponse;

        const location = res.locations.find(
          (loc) =>
            loc.name.toLowerCase().replaceAll(/\W+/g, '-') ===
            nameValue.toLowerCase().replaceAll(/\W+/g, '-')
        ) as LocationLink;

        setData({
          _type: 'location',
          ...res,
          template: {
            ...res.template,
            banner: res.template.banner
              ? {
                  ...res.template.banner,
                  subtitle: res.template.banner?.subtitle
                    ? res.template.banner.subtitle.replaceAll(
                        '##location##',
                        location.name
                      )
                    : location.area,
                }
              : null,
          },
          location,
        });
        setBreadcrumbs([
          {
            text: 'Home',
            url: '/',
          },
          {
            text: 'Areas We Cover',
            url: '/locations/',
          },
          {
            text: location.name,
            url: `/locations/${location.name.toLowerCase().replaceAll(/\W+/g, '-')}`,
          },
        ]);
        break;

      case 'page':
        res = (await client.fetch(pagesQuery, {
          slug: nameValue,
        })) as PageQueryResponse;

        if (!res.page) {
          setData({
            _type: 'page',
            template: undefined,
          });
        } else {
          setData({
            _type: 'page',

            ...res,
            template: {
              ...res.page,
              banner: res.page.banner
                ? {
                    ...res.page.banner,
                    subtitle: res.page.banner.subtitle
                      ? res.page.banner.subtitle
                      : res.page.parent
                        ? res.page.parent.title
                        : '',
                  }
                : null,
            },
          });
          let bc = [
            {
              text: 'Home',
              url: '/',
            },
          ];

          if (res.page.parent) {
            bc.push({
              text: res.page.parent.title,
              url: `/${res.page.parent.slug.current}`,
            });
          }

          bc.push({
            text: res.page.title,
            url: `/${res.page.slug}`,
          });

          setBreadcrumbs(bc);
        }
        break;

      default:
        break;
    }

    setLoading(false);
  }
}
