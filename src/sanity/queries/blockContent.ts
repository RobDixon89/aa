import {
  embeddedFormSnippet,
  type EmbeddedFormResponse,
} from '@/stories/widgets/EmbeddedForm/schema';
import { faqsSnippet, type FaqsResponse } from '@/stories/widgets/FAQs/schema';
import {
  imageBlockSnippet,
  type ImageBlockResponse,
} from '@/stories/widgets/ImageBlock/schema';
import {
  imageText5050Snippet,
  type ImageText5050Response,
} from '@/stories/widgets/ImageText5050/schema';
import {
  locationListSnippet,
  richTextSnippet,
  type LocationListResponse,
  type RichTextResponse,
} from '@/stories/widgets/RichText/schema';
import {
  serviceCardsSnippet,
  type ServiceCardsResponse,
} from '@/stories/widgets/ServiceCards/schema';
import {
  stepsSnippet,
  type StepsResponse,
} from '@/stories/widgets/Steps/schema';

export const widgetsSnippet = `
  _type=='embeddedForm'=>{ ${embeddedFormSnippet} },
  _type=='faqs'=>{ ${faqsSnippet} },
  _type=='imageBlock'=>{ ${imageBlockSnippet} },
  _type=='imageText5050'=>{ ${imageText5050Snippet} },
  _type=='locationList'=>{ ${locationListSnippet} },
  _type=='richText'=>{ ${richTextSnippet} },
  _type=='serviceCards'=>{ ${serviceCardsSnippet} },
  _type=='steps'=>{ ${stepsSnippet} },
`;

export type Widget =
  | EmbeddedFormResponse
  | ImageBlockResponse
  | ImageText5050Response
  | FaqsResponse
  | LocationListResponse
  | RichTextResponse
  | StepsResponse
  | ServiceCardsResponse;
