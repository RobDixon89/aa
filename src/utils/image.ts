import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const builder = imageUrlBuilder(sanityClient);

type ImageParams = {
  width: number;
  aspectRatio: number;
};

type ImageSources = {
  src: string;
  srcSet: string;
};

export function getSrcs(
  image: ImageModel | null,
  min: number,
  max: number,
  steps: number,
  ratio: number
): ImageSources {
  if (!image) {
    return {
      src: "",
      srcSet: "",
    };
  }

  const diff = max - min;
  const increment = diff / (steps - 1);
  const sizes = [
    min,
    ...Array(steps - 2)
      .fill("")
      .map((_, i) => Math.ceil(min + increment * (i + 1))),
  ];

  const array = sizes.map(
    (size) =>
      `${urlFor(image.asset ? image.asset : image.src)
        .width(Math.ceil(size * 1.5))
        .height(Math.ceil((size / ratio) * 1.5))} ${size}w`
  );

  return {
    src: array[0].split(" ")[0],
    srcSet: array.join(","),
  };
}

function urlFor(source: string | SanityReference) {
  return builder.image(source);
}
