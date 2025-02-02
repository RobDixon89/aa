import {
  homeHeroBannerSnippet,
  type HomeHeroBannerResponse,
} from '@/stories/widgets/HomeHero/schema';
import {
  serviceCardSnippet,
  type ServiceCardResponse,
} from '@/stories/widgets/ServiceCards/schema';
import { locationLinkSnippet, type LocationLink } from '../schema/linkList';
import { widgetsSnippet } from './blockContent';
import { metadataSnippet, type PageResponseFields } from './pages';
import { siteSettingsQuery, type SiteSettingsResponse } from './settings';

export const homepageQuery = `{
  "settings": ${siteSettingsQuery}, 
  "template": *[_type == "homepage"][0] {
    ...,
    ${metadataSnippet},
    banner { ${homeHeroBannerSnippet} },
    blockContent[] { 
      ${widgetsSnippet} 
    }
  },
  "locations": *[_type == "location"] { _type, ${locationLinkSnippet} },
  "services": *[_type == "service"] { ${serviceCardSnippet}}
}`;

export type HomepageResponse = Omit<PageResponseFields, 'banner'> & {
  _type: 'homepage';
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  title: string;
  banner: HomeHeroBannerResponse;
};

export type HomepageQueryResponse = {
  settings: SiteSettingsResponse;
  template: HomepageResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};
