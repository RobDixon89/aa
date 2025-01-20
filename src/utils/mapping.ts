import { groupByArea, groupByParent } from ".";
import type { ImageWithAlt } from "../../schema/image";
import type {
  InternalLink,
  LabelledLink,
  LocationLink,
  ServiceLink,
} from "../../schema/linkList";
import type { NavigationLink } from "../stories/widgets/Header/Header";
import type { DropdownLinkResponse } from "../stories/widgets/Header/schema";
import type { ServiceCardResponse } from "../stories/widgets/ServiceCards/schema";
import type { ServiceModel } from "../stories/widgets/ServiceCards/ServiceCards";
import type { ContentStep, ImageStep } from "../stories/widgets/Steps/schema";
import type {
  ImageCardModel,
  StepCardModel,
} from "../stories/widgets/Steps/Steps";

export const CONTACTFORM_ID = "contactForm";

export function mapLinkAttributes(link: LabelledLink): CtaModel {
  return {
    text: link.title
      ? link.title
      : link.internalLink
        ? getInternalLinkLabel(link.internalLink)
        : link.externalUrl
          ? link.externalUrl
          : "",
    url: link.contactLink
      ? `#${CONTACTFORM_ID}`
      : link.internalLink
        ? getInternalLinkUrl(link.internalLink)
        : link.externalUrl
          ? link.externalUrl
          : "",
    target: link.externalUrl ? "_blank" : "_self",
  };
}

export function getInternalLinkLabel(link: InternalLink): string {
  switch (link._type) {
    case "location":
      return link.name;

    default:
      return link.title;
  }
}

export function getInternalLinkUrl(link: InternalLink): string {
  switch (link._type) {
    case "location":
      return getLocationLinkUrl(link);

    case "service":
      return getServiceLinkUrl(link);

    default:
      return `/${link.url}`;
  }
}

export function getServiceLinkUrl(
  service: ServiceLink,
  locationName?: string,
  isSlug?: boolean
): string {
  return `/${!isSlug ? "services/" : ""}${service.parent ? `${service.parent.toLowerCase().replaceAll(/\W+/g, "-")}/` : ""}${service.title.toLowerCase().replaceAll(/\W+/g, "-")}${locationName ? `/${locationName.toLowerCase().replaceAll(/\W+/g, "-")}` : ""}`;
}

export function getLocationLinkUrl(location: LocationLink): string {
  return `/${location.name.toLowerCase().replaceAll(/\W+/g, "-")}`;
}

export function mapServiceCardAttributes(
  service: ServiceCardResponse,
  locationName?: string
): ServiceModel {
  return {
    id: service._id,
    parent: service.parent ? service.parent : undefined,
    name: service.title,
    description: service.description,
    image: service.bannerImage
      ? mapImageAttributes(service.bannerImage)
      : service.metaImage
        ? mapImageAttributes(service.metaImage)
        : null,
    url: getServiceLinkUrl(service, locationName),
  };
}

export function mapImageAttributes(image: ImageWithAlt): ImageModel {
  return {
    src: image.imageUrl,
    altText: image.altText,
    hotspot: image.hotspot,
  };
}

export function mapStepAttributes(
  step: ContentStep | ImageStep
): StepCardModel | ImageCardModel {
  if (step._type === "stepImage") {
    return {
      _type: "stepImage",
      id: step._key,
      image: mapImageAttributes(step.image),
      imageType: step.imageType,
    };
  }

  return {
    _type: "step",
    id: step._key,
    content: step.blockContent,
    theme: step.theme,
  };
}

export function mapNavigationDropdown(
  link: DropdownLinkResponse,
  index: number,
  locations: LocationLink[],
  services: ServiceCardResponse[]
): NavigationLink {
  switch (link._type) {
    case "dropdown":
      return {
        id: `nav-link-${index}`,
        text: link.text ? link.text : link.pageTitle,
        url: link.url,
        dropdown: {
          type: "simple",
          items: link.links
            ? link.links.map((l) => ({
                text: getInternalLinkLabel(l),
                url: getInternalLinkUrl(l),
              }))
            : [],
        },
      };

    case "locationDropdown":
      const areas = groupByArea(locations.filter((l) => !!l.addToNav));

      return {
        id: `nav-link-${index}`,
        text: link.text,
        url: "/locations/",
        dropdown: {
          type: "complex",
          items: Object.entries(areas).map(([key, value]) => ({
            title: key,
            items: value.map((loc) => ({
              text: loc.name,
              url: getLocationLinkUrl(loc),
            })),
          })),
        },
      };

    case "servicesDropdown":
      const groups = groupByParent(services);

      return {
        id: `nav-link-${index}`,
        text: link.text,
        url: "/services/",
        dropdown: {
          type: "complex",
          items: Object.entries(groups).map(([key, value]) => ({
            title: key,
            items: value.map((service) => ({
              text: service.title,
              url: getServiceLinkUrl(service),
            })),
          })),
        },
      };
  }
}
