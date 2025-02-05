import {
  globalFormFieldQuery,
  GlobalFormFieldsResponse,
} from '@/stories/widgets/EmbeddedForm/schema';
import {
  footerQuery,
  type FooterFieldResponse,
} from '@/stories/widgets/Footer/schema';
import {
  headerQuery,
  type HeaderFieldResponse,
} from '@/stories/widgets/Header/schema';
import { uspListQuery, type UspFieldResponse } from '../schema/uspList';

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{ 
  gaID,
  ${headerQuery},
  ${footerQuery},
  ${uspListQuery},
  ${globalFormFieldQuery}
}`;

export type SiteSettingsResponse = HeaderFieldResponse &
  FooterFieldResponse &
  UspFieldResponse & {
    gaID: string | null;
    form: GlobalFormFieldsResponse;
  };
