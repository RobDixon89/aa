import type { ReactElement } from "react";
import type { LocationLink } from "../../schema/linkList";
import type { ServiceCardResponse } from "../stories/widgets/ServiceCards/schema";

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function highlightTitleWords(title: string): string {
  return title.replaceAll(/\*([^*]+)\*/g, "<span class='highlight'>$1</i>");
}

export function clamp(value: number, max: number): number {
  return Math.max(Math.min(value, max), 0);
}

type Area = {
  [key: string]: LocationLink[];
};

export const groupByArea = (locations: LocationLink[]): Area =>
  locations.reduce((acc, a) => {
    const key = a.area;
    // @ts-ignore
    acc[key] ??= [];
    // @ts-ignore
    acc[key].push(a);
    return acc;
  }, {});

type ServiceGroup = {
  [key: string]: ServiceCardResponse[];
};

export const groupByParent = (services: ServiceCardResponse[]): ServiceGroup =>
  services.reduce((acc, s) => {
    const key = s.parent ? s.parent : s.title;
    // @ts-ignore
    acc[key] ??= [];
    // @ts-ignore
    acc[key].push(s);
    return acc;
  }, {});

export function insertLocationName(children: any, location?: string): string {
  const contentString = (children?.valueOf() as ReactElement).props.value;

  if (!location) {
    return contentString;
  }

  return (
    contentString
      // Replace all placeholders with location name
      .replaceAll("##location##", location)
      // Update all service links to point at the service for that location
      .replaceAll(
        /href="([^"]+\/services\/[^"]+)"/g,
        `href="$1/${location.toLowerCase().replaceAll(/\W+/g, "-")}"`
      )
  );
}
