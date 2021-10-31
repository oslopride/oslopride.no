import { Handler } from "@netlify/functions";
import { createHmac } from "crypto";

function verifySignature(received, payloadBody) {
  const secret = process.env.TYPEFORM_WEBHOOK_SECRET;
  const b64hmac = createHmac("sha256", secret)
    .update(payloadBody)
    .digest("base64");
  const signature = "sha256=" + b64hmac;
  console.debug({ received, signature });
  return received === signature;
}

export const handler: Handler = async (event: any) => {
  console.log(event);
  const body = JSON.parse(event.body);
  const receivedSignature = event.headers["typeform-signature"];

  const isVerified = verifySignature(receivedSignature, event.body.toString());
  console.log({ isVerified });

  return {
    statusCode: 200,
    body: "Beep, boop, you just got serverless."
  };
};
