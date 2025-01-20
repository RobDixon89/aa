import {
  innerPageBannerQuery,
  type InnerPageBannerResponse,
} from "../src/stories/widgets/InnerPageBanner/schema";

export const pagesQuery = `*[_type == "page" && defined(slug.current)] {
  ...,
  "slug": slug.current,
  "parent": parentPage-> {
    title,
    slug
  },
  banner { ${innerPageBannerQuery} }
}`;

export type PageResponse = {
  banner: InnerPageBannerResponse;
};
