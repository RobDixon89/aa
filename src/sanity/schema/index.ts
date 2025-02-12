// Component schema definitions
import image from './image';
import linkList from './linkList';
import uspList from './uspList';

// Widget schema definitions
import { embeddedFormSchema } from '@/stories/widgets/EmbeddedForm/schema';
import { faqsSchema } from '@/stories/widgets/FAQs/schema';
import { homeHeroSchema } from '@/stories/widgets/HomeHero/schema';
import { imageBlockSchema } from '@/stories/widgets/ImageBlock/schema';
import { imageText5050Schema } from '@/stories/widgets/ImageText5050/schema';
import { innerPageBannerSchema } from '@/stories/widgets/InnerPageBanner/schema';
import {
  locationListSchema,
  richTextSchema,
} from '@/stories/widgets/RichText/schema';
import { serviceCardsSchema } from '@/stories/widgets/ServiceCards/schema';
import { stepsSchema } from '@/stories/widgets/Steps/schema';

// Page schema definitions
import area from './area';
import homepage from './homepage';
import location from './location';
import locationTemplates from './locationTemplates';
import innerPage from './page';
import service from './service';
import serviceLandingTemplate from './serviceLandingTemplate';
import settings from './settings';

export const schemaTypes = [
  settings,

  // Components
  image,
  uspList,
  linkList,

  // Widgets
  embeddedFormSchema,
  faqsSchema,
  homeHeroSchema,
  imageBlockSchema,
  imageText5050Schema,
  innerPageBannerSchema,
  locationListSchema,
  richTextSchema,
  serviceCardsSchema,
  stepsSchema,

  // Pages
  area,
  homepage,
  innerPage,
  location,
  locationTemplates,
  service,
  serviceLandingTemplate,
];
