import { imageWithAltSnippet } from "../schema/image";
import { locationLinkSnippet, type LocationLink } from "../schema/linkList";
import { innerPageBannerSnippet } from "../src/stories/widgets/InnerPageBanner/schema";
import {
  serviceCardSnippet,
  type ServiceCardResponse,
} from "../src/stories/widgets/ServiceCards/schema";
import { widgetsSnippet } from "./blockContent";
import type { PageResponseFields } from "./pages";
import { siteSettingsQuery, type SiteSettingsResponse } from "./settings";

export const locationInnerPagesQuery = `{
  "settings": ${siteSettingsQuery}, 
  "template": *[_type == "locationTemplates"][0] {
    "metaTitle": locationMetaMetaTitle,
    "metaDescription": locationMetaMetaDescription,
    "metaImage": locationMetaMetaImage {
      ${imageWithAltSnippet}
    },
    "banner": locationBanner { ${innerPageBannerSnippet} },
    "blockContent": locationContent[] { 
      ${widgetsSnippet} 
    }
  },
  "locations": *[_type == "location"] { ${locationLinkSnippet} },
  "services": *[_type == "service"] { ${serviceCardSnippet}}
}`;

export type LocationInnerTemplateResponse = PageResponseFields & {
  _type: "locationTemplates";
  _createdAt: string;
  _updatedAt: string;
};

export type LocationInnerPagesQueryResponse = {
  settings: SiteSettingsResponse;
  template: LocationInnerTemplateResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};

export const locationLandingPageQuery = `{
  "settings": ${siteSettingsQuery}, 
  "template": *[_type == "locationTemplates"][0] {
    title,
    "metaTitle": landingMetaMetaTitle,
    "metaDescription": landingMetaMetaDescription,
    "metaImage": landingMetaMetaImage {
      ${imageWithAltSnippet}
    },
    "banner": landingBanner { ${innerPageBannerSnippet} },
    "blockContent": landingContent[] { 
      ${widgetsSnippet} 
    }
  },
  "locations": *[_type == "location"] { ${locationLinkSnippet} },
  "services": *[_type == "service"] { ${serviceCardSnippet}}
}`;

export type LocationLandingTemplateResponse = PageResponseFields & {
  _type: "locationTemplates";
  _createdAt: string;
  _updatedAt: string;
  title: string;
};

export type LocationLandingPageQueryResponse = {
  settings: SiteSettingsResponse;
  template: LocationLandingTemplateResponse;
  locations: LocationLink[];
  services: ServiceCardResponse[];
};
