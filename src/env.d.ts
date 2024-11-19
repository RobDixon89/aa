/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare type CtaModel = {
  text: string;
  url: string;
  target?: "_self" | "_blank";
};
