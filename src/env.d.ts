/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare type CtaModel = {
  text: string;
  url: string;
  target?: "_self" | "_blank";
};

interface SanityReference {
  _ref: string;
}

interface SanityImageObject {
  asset: SanityAsset;
  hotspot?: SanityImageHotspot;
}

declare type ImageModel = {
  altText?: string;
  src: string;
  aspectRatio?: number;
  hotspot?: SanityImageHotspot;
  asset?: SanityReference;
};
