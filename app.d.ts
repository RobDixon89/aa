declare type CtaModel = {
  text: string;
  url: string;
  target?: '_self' | '_blank';
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

interface Window {
  cookieconsent: any;
  TRACKING: boolean;
}
