import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! || "";
const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! || "production";
const version = import.meta.env.PUBLIC_SANITY_VERSION! || "2023-03-20";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: version,
});

const builder = imageUrlBuilder(client);

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
