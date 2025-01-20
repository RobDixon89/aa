import type { InternalLink, LabelledLink } from "../../schema/linkList";

export function mapLinkAttributes(link: LabelledLink): CtaModel {
  console.log(link);
  return {
    text: link.title
      ? link.title
      : link.internalLink
        ? getInternalLinkLabel(link.internalLink)
        : link.externalUrl
          ? link.externalUrl
          : "",
    url: link.contactLink
      ? "#contactForm"
      : link.internalLink
        ? getInternalLinkUrl(link.internalLink)
        : link.externalUrl
          ? link.externalUrl
          : "",
    target: link.externalUrl ? "_blank" : "_self",
  };
}

function getInternalLinkLabel(link: InternalLink): string {
  switch (link._type) {
    case "location":
      return link.name;

    default:
      return link.title;
  }
}

function getInternalLinkUrl(link: InternalLink): string {
  switch (link._type) {
    case "location":
      return `/locations/${link.area ? `${link.area.toLowerCase().replaceAll(" ", "-")}/` : ""}${link.name.toLowerCase().replaceAll(" ", "-")}`;

    case "locationTemplates":
      return `/locations/`;

    case "service":
      return `/locations/${link.parent ? `${link.parent.toLowerCase().replaceAll(" ", "-")}/` : ""}${link.title.toLowerCase().replaceAll(" ", "-")}`;

    case "serviceLandingTemplate":
      return `/services/`;

    default:
      return `/${link.title.toLowerCase().replaceAll(" ", "-")}`;
  }
}
