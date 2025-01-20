/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare type CtaModel = {
  text: string;
  url: string;
  target?: "_self" | "_blank";
};

declare type ImageModel = {
  altText?: string;
  src: string;
  aspectRatio?: number;
  hotspot?: {
    _type?: string;
    width: number;
    height: number;
    x: number;
    y: number;
  } | null;
};
