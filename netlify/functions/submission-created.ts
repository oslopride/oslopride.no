import { Handler } from "@netlify/functions";

export const handler: Handler = (event, context, callback) => {
	const body = JSON.parse(event.body || "")?.payload;

	console.log(body);

	return callback(null, {
		statusCode: 200,
		body: "Beep, boop, you just got serverless."
	});
};
