import sanityClient from "@sanity/client";

const isProduction = process.env.NODE_ENV === "production";

export default sanityClient({
  projectId: "2ger3rla",
  dataset: "production",
  useCdn: isProduction
});
