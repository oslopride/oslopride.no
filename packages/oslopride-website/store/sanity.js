import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const isProduction = process.env.NODE_ENV === "production";

const sanity = sanityClient({
  projectId: "2ger3rla",
  dataset: "production",
  useCdn: isProduction
});

const imageBuilder = imageUrlBuilder(sanity);

export const imageUrlFor = source => imageBuilder.image(source);

export default sanity;
