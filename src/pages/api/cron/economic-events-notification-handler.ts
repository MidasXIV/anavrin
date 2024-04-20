import { NextApiRequest, NextApiResponse } from "next";
import { findMatchingEvent, formatNotificationMessage } from "lib/financial-event-webpush";
import UserModel from "repositories/UserModel/userModel";
import connectToDatabase from "lib/mongodb";
import api from "services/create-service";
import createHandlers from "../../../lib/rest-utils";

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
            const baseUrl = process.env.NEXTAUTH_URL;

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
          res.status(400).json({ message: "Improper request body" });
          break;
      }

      const { title, message } = formatNotificationMessage(scheduledReminderObject);

      const db = await connectToDatabase();
      const userModel = new UserModel(db);
      const subscriptions =
        (await userModel.getAllUserSubscription()) as PushSubscriptionDocument[];
      let failedSubscriptionCount = 0;
      // Array to hold fetch promises
      const fetchPromises = subscriptions.map(async subscription => {
        try {
          // Send fetch request for each subscription
          const response = await api.triggerPushSubscription({
            title,
            message,
            subscription
          });

          if (response.status !== 201) {
            console.error(`Failed to send notification for subscription ${subscription._id}`);
            failedSubscriptionCount += 1;
          }
        } catch (error) {
          console.error(
            `Error occurred while sending notification for subscription ${subscription._id}:`,
            error
          );
          failedSubscriptionCount += 1;
        }
      });

      // Execute all fetch promises concurrently and wait for all to settle
      await Promise.allSettled(fetchPromises);

      console.log(
        `Successful : ${
          subscriptions.length - failedSubscriptionCount
        } Unsuccessful : ${failedSubscriptionCount} Total : ${subscriptions.length}`
      );

      res.status(200).json({ message: "Notification sent" });
    } catch (err) {
      // Report the error to metrics + logging app
      console.log(err);
      res.status(500).json(err);
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
