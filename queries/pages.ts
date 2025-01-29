import { widgetsSnippet, type Widget } from "../queries/blockContent";
import { imageWithAltSnippet, type ImageWithAlt } from "../schema/image";
import { locationLinkSnippet, type LocationLink } from "../schema/linkList";
import {
  innerPageBannerSnippet,
  type InnerPageBannerResponse,
} from "../src/stories/widgets/InnerPageBanner/schema";
import {
  serviceCardSnippet,
  type ServiceCardResponse,
} from "../src/stories/widgets/ServiceCards/schema";
import { siteSettingsQuery, type SiteSettingsResponse } from "./settings";

export const metadataSnippet = `
  metaTitle,
  metaDescription,
  metaImage {
    ${imageWithAltSnippet}
  }
`;

export const pagesQuery = `{
  "settings": ${siteSettingsQuery}, 
  "pages": *[_type == "page" && defined(slug.current)] {
    ...,
    "slug": slug.current,
    "parent": parentPage-> {
      title,
      slug
    },
    ${metadataSnippet},
    banner { ${innerPageBannerSnippet} },
    blockContent[] { 
      ${widgetsSnippet} 
    }
  },
  "locations": *[_type == "location"] { ${locationLinkSnippet} },
  "services": *[_type == "service"] { ${serviceCardSnippet}}
}`;

type Parent = {
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
};

export type PageResponseFields = {
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: ImageWithAlt | null;
  banner: InnerPageBannerResponse | null;
  blockContent: Widget[] | null;
};

export type PageResponse = PageResponseFields & {
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  title: string;
  slug: string;
  parent: Parent | null;
};

export type PageQueryResponse = {
  settings: SiteSettingsResponse;
  pages: PageResponse[];
  locations: LocationLink[];
  services: ServiceCardResponse[];
};
