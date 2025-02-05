import { innerPageBannerSnippet } from '@/stories/widgets/InnerPageBanner/schema';
import {
  serviceCardSnippet,
  type ServiceCardResponse,
} from '@/stories/widgets/ServiceCards/schema';
import { imageWithAltSnippet } from '../schema/image';
import { locationLinkSnippet, type LocationLink } from '../schema/linkList';
import { widgetsSnippet } from './blockContent';
import { metadataSnippet, type PageResponseFields } from './pages';
import { siteSettingsQuery, type SiteSettingsResponse } from './settings';

export const serviceSlugsQuery = `{
  "services": *[_type == "service"] {
    title,
    "parent": parentService-> title,,
    "hasLocationPage": defined(locationContent) && defined(locationContent)
  },
  "locations": *[_type == "location"] { name },
}`;

export type ServiceSlugsResponse = {
  services: {
    title: string;
    parent: string | null;
    hasLocationPage: boolean;
  }[];
  locations: { name: string }[];
};

export const servicePagesQuery = `{
  "settings": ${siteSettingsQuery}, 
  "services": *[_type == "service"] {
    _type,
    _id,
    _createdAt,
    _updatedAt,
    title,
    "parent": parentService-> title,
    description,
    "landing": {
      "metaTitle": landingMetaMetaTitle,
      "metaDescription": landingMetaMetaDescription,
      "metaImage": landingMetaMetaImage {
        ${imageWithAltSnippet}
      },
      "banner": landingBanner {
        ${innerPageBannerSnippet}
      },      
      "blockContent": landingContent[] { 
        ${widgetsSnippet} 
      }
    },
    "location": {
      "metaTitle": locationMetaMetaTitle,
      "metaDescription": locationMetaMetaDescription,
      "metaImage": locationMetaMetaImage {
        ${imageWithAltSnippet}
      },
      "banner": locationBanner { ${innerPageBannerSnippet} },      
      "blockContent": locationContent[] { 
        ${widgetsSnippet} 
      }
    }
  },
  "locations": *[_type == "location"] { _type, ${locationLinkSnippet} },
}`;

export type ServiceResponse = {
  _type: 'service';
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  parent: string | null;
  description: string;
  landing: PageResponseFields;
  location: PageResponseFields;
};

export type ServicePagesQueryResponse = {
  settings: SiteSettingsResponse;
  services: ServiceResponse[];
  locations: LocationLink[];
};

export const serviceLandingPageQuery = `{
  "settings": ${siteSettingsQuery}, 
  "template": *[_type == "serviceLandingTemplate"][0] {
    ...,
    ${metadataSnippet},
    banner { ${innerPageBannerSnippet} },
    blockContent[] { 
      ${widgetsSnippet} 
    }
  },
  "locations": *[_type == "location"] { _type, ${locationLinkSnippet} },
  "services": *[_type == "service"] { ${serviceCardSnippet}}
}`;

export type ServiceLandingTemplateResponse = PageResponseFields & {
  _type: 'serviceLandingTemplate';
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  title: string;
};

export type ServiceLandingPageQueryResponse = {
  settings: SiteSettingsResponse;
  template: ServiceLandingTemplateResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};
