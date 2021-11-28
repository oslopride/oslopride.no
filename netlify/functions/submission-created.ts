import { Handler } from "@netlify/functions";
import sanityClient from "@sanity/client";
import Busboy from "busboy";

function parseMultipartForm(event: any): Promise<Record<any, any>> {
  return new Promise(resolve => {
    // we'll store all form fields inside of this
    const fields: Record<any, any> = {};

    // let's instantiate our busboy instance!
    const busboy = new Busboy({
      // it uses request headers
      // to extract the form boundary value (the ----WebKitFormBoundary thing)
      headers: event.headers
    });

    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    busboy.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        filestream.on("data", data => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data
          };
        });
      }
    );

    // whenever busboy comes across a normal field ...
    busboy.on("field", (fieldName, value) => {
      // ... we write its value into `fields`.
      fields[fieldName] = value;
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    busboy.on("finish", () => {
      resolve(fields);
    });

    // now that all handlers are set up, we can finally start processing our request!
    busboy.write(event.body);
  });
}

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

  const fields = await parseMultipartForm(event);
  console.log(fields);

  if (fields.image) {
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
