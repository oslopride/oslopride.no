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
  // console.log(context);
  // console.log(DATASET);
  const body = JSON.parse(event.body || "")?.payload;
  console.log(body);

  if (body.data.image) {
    console.log(body.data.image.content);
    console.log(body.data.image.toString());
    // const assetDocument = client.assets
    // .upload('file', file)
    // .then((document) => {
    //   console.log('The file was uploaded!', document)
    // })
    // .catch((error) => {
    //   console.error('Upload failed:', error.message)
    // })
  }

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
