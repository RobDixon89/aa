// Component schema definitions
import image from "./image";
import linkList from "./linkList";
import uspList from "./uspList";

// Widget schema definitions
import { innerPageBannerSchema } from "../src/stories/widgets/InnerPageBanner/InnerPageBanner";

// Page schema definitions
import { embeddedFormSchema } from "../src/stories/widgets/EmbeddedForm/EmbeddedForm";
import { faqsSchema } from "../src/stories/widgets/FAQs/FAQs";
import { homeHeroSchema } from "../src/stories/widgets/HomeHero/HomeHero";
import { imageBlockSchema } from "../src/stories/widgets/ImageBlock/ImageBlock";
import { imageText5050Schema } from "../src/stories/widgets/ImageText5050/ImageText5050";
import {
  locationListSchema,
  richTextSchema,
} from "../src/stories/widgets/RichText/RichText";
import { serviceCardsSchema } from "../src/stories/widgets/ServiceCards/ServiceCards";
import { stepsSchema } from "../src/stories/widgets/Steps/Steps";
import { testimonialsSchema } from "../src/stories/widgets/Testimonials/Testimonials";
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
