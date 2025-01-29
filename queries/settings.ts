import { uspListQuery, type UspFieldResponse } from "../schema/uspList";
import {
  footerQuery,
  type FooterFieldResponse,
} from "../src/stories/widgets/Footer/schema";
import {
  headerQuery,
  type HeaderFieldResponse,
} from "../src/stories/widgets/Header/schema";

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{ 
  gaID,
  ${headerQuery},
  ${footerQuery},
  ${uspListQuery}
}`;

export type SiteSettingsResponse = HeaderFieldResponse &
  FooterFieldResponse &
  UspFieldResponse & {
    gaID: string | null;
  };
