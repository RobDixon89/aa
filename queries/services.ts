import { imageWithAltSnippet } from "../schema/image";
import { locationLinkSnippet, type LocationLink } from "../schema/linkList";
import { innerPageBannerSnippet } from "../src/stories/widgets/InnerPageBanner/schema";
import {
  serviceCardSnippet,
  type ServiceCardResponse,
} from "../src/stories/widgets/ServiceCards/schema";
import { widgetsSnippet } from "./blockContent";
import { metadataSnippet, type PageResponseFields } from "./pages";
import { siteSettingsQuery, type SiteSettingsResponse } from "./settings";

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
      "blockContent": locationContent[] { 
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
  _type: "service";
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
  _type: "serviceLandingTemplate";
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
