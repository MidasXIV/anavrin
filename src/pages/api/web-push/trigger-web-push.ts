import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import createHandlers from "../../../lib/rest-utils";

const vapidDetails = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  subject: process.env.VAPID_SUBJECT
};

const options = {
  TTL: 10000,
  vapidDetails
};

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const { subscription, title, message } = req.body;
    webPush
      .sendNotification(subscription, JSON.stringify({ title, message }), options)
      .then(response => {
        res.writeHead(response.statusCode, response.headers).end(response.body);
      })
      .catch(err => {
        if (err.statusCode === 404 || err.statusCode === 410) {
          // console.log("Subscription has expired or is no longer valid: ", err);
          // return deleteSubscriptionFromDatabase(subscription._id);
        }
        console.log(err);
        if ("statusCode" in err) {
          res.writeHead(err.statusCode, err.headers).end(err.body);
        } else {
          console.error(err);
          res.statusCode = 500;
          res.end();
        }
      });
  }
};

export default async function TriggerWebPush(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
