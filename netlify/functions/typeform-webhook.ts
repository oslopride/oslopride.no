import { Handler } from "@netlify/functions";
import { createHmac } from "crypto";

function verifySignature(received, payloadBody) {
  const secret = process.env.TYPEFORM_WEBHOOK_SECRET;
  console.log(secret);
  const b64hmac = createHmac("sha256", secret)
    .update(payloadBody)
    .digest("base64");
  const signature = "sha256=" + b64hmac;
  console.log({ received, signature });
  return received === signature;
}

export const handler: Handler = (event, context, callback) => {
  const body = JSON.parse(event.body);

  console.log(body);

  const isVerified = verifySignature(
    body["typeform-signature"],
    event.body.toString()
  );
  console.log({ isVerified });

  return callback(null, {
    statusCode: 200,
    body: "Beep, boop, you just got serverless."
  });
};
