import { NextApiRequest, NextApiResponse } from "next";
import { findMatchingEvent, formatNotificationMessage } from "lib/financial-event-webpush";
import UserModel from "repositories/UserModel/userModel";
import connectToDatabase from "lib/mongodb";
import createHandlers from "../../../lib/rest-utils";
import Result from "../../../lib/result";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Parse the request body

      let scheduledReminderObject = req.body;
      const { code } = req.body;

      // Check the value of the 'code' property
      switch (code) {
        case "EVENT_NOTIFY":
          // Handle the case when code is 'EVENT_NOTIFY'
          console.log("Received EVENT_NOTIFY");
          // Your logic for EVENT_NOTIFY
          break;
        case "EVENT_RESULT":
          {
            // Handle the case when code is 'EVENT_RESULT'
            console.log("Received EVENT_RESULT");
            // Your logic for EVENT_RESULT
            const baseUrl = process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : "http://localhost:3000";

            const response = await fetch(`${baseUrl}/api/services/economic-events`);
            const data: EcnomicEventsDTO = await response.json();
            const matchingEvent = findMatchingEvent(req.body, data);
            if (matchingEvent) {
              scheduledReminderObject = { ...scheduledReminderObject, ...matchingEvent };
              console.log("Matching event found:", scheduledReminderObject);
            } else {
              console.log("No matching event found");
            }
          }
          break;
        default:
          // Handle other cases if necessary
          console.log("Received unknown code:", code);
          break;
      }

      const { title, message } = formatNotificationMessage(scheduledReminderObject);

      const db = await connectToDatabase();
      const userModel = new UserModel(db);
      const subscriptions = await userModel.getAllUserSubscription();

      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

      // Array to hold fetch promises
      const fetchPromises = subscriptions.map(async subscription => {
        try {
          // Send fetch request for each subscription
          const response = await fetch(`${baseUrl}/api/web-push/trigger-web-push`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title,
              message,
              subscription
            })
          });

          // Handle response status
          if (!response.ok) {
            console.error(`Failed to send notification for subscription ${subscription._id}`);
          }
        } catch (error) {
          console.error(
            `Error occurred while sending notification for subscription ${subscription._id}:`,
            error
          );
        }
      });

      // Execute all fetch promises concurrently and wait for all to settle
      await Promise.allSettled(fetchPromises);

      res.status(200).json({ message: "Notification sent" });
    } catch (err) {
      // Report the error to metrics + logging app
      console.log(err);
      res.status(500);
    }
  }
};

export default async function EconomicEventsNotificationHandlerController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
