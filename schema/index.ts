// Component schema definitions
import image from "./image";
import linkList from "./linkList";
import uspList from "./uspList";

// Widget schema definitions
import { embeddedFormSchema } from "../src/stories/widgets/EmbeddedForm/schema";
import { faqsSchema } from "../src/stories/widgets/FAQs/schema";
import { homeHeroSchema } from "../src/stories/widgets/HomeHero/schema";
import { imageBlockSchema } from "../src/stories/widgets/ImageBlock/schema";
import { imageText5050Schema } from "../src/stories/widgets/ImageText5050/schema";
import { innerPageBannerSchema } from "../src/stories/widgets/InnerPageBanner/schema";
import {
  locationListSchema,
  richTextSchema,
} from "../src/stories/widgets/RichText/schema";
import { serviceCardsSchema } from "../src/stories/widgets/ServiceCards/schema";
import { stepsSchema } from "../src/stories/widgets/Steps/schema";
import { testimonialsSchema } from "../src/stories/widgets/Testimonials/Testimonials";

// Page schema definitions
import area from "./area";
import homepage from "./homepage";
import location from "./location";
import locationTemplates from "./locationTemplates";
import innerPage from "./page";
import service from "./service";
import serviceLandingTemplate from "./serviceLandingTemplate";
import settings from "./settings";
import testimonial from "./testimonial";

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
  testimonialsSchema,

  // Pages
  area,
  homepage,
  innerPage,
  location,
  locationTemplates,
  service,
  serviceLandingTemplate,
  testimonial,
];
