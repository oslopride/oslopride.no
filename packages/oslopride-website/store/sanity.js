import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const isProduction = process.env.NODE_ENV === "production";

export const PROJECT_ID = "2ger3rla";
export const DATASET = "production";

const sanity = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: isProduction
});

const imageBuilder = imageUrlBuilder(sanity);

export const imageUrlFor = source => imageBuilder.image(source);

export default sanity;
