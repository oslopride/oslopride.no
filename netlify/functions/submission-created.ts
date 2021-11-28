import { Handler } from "@netlify/functions";
import sanityClient from "@sanity/client";

const SANITY_TOKEN = process.env.SK2022_SUBMISSION_SANITY_TOKEN;
const PROJECT_ID = "2ger3rla";
const DATASET = process.env.SANITY_STUDIO_API_DATASET || "development";

const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: SANITY_TOKEN,
  useCdn: false
});

export const handler: Handler = async (event, context) => {
  console.log(context);
  console.log(DATASET);
  const body = JSON.parse(event.body);
  console.log(body);

  // const doc = {
  //   _type: "externalEventRequest",
  //   eventName: "Test lambda",
  //   eventDescription: "Test",
  //   eventDate: new Date().toISOString(),
  //   eventEmail: "testmail",
  //   _id: "drafts."
  // };

  // const docRes = await client.create(doc);
  // console.log(docRes._id);

  return {
    statusCode: 200,
    body: "Beep, boop, you just got serverless."
  };
};
