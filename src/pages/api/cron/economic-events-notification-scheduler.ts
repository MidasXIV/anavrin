import { NextApiRequest, NextApiResponse } from "next";
import MergentSchedulerModel from "repositories/MergentTaskSchedulerModel/mergentTaskSchedulerModel";
import { createScheduledReminderObjects } from "lib/financial-event-webpush";
import createHandlers from "../../../lib/rest-utils";
import Result from "../../../lib/result";

// Function to validate authentication token
function isValidAuthToken(token: string): boolean {
  // Implement your token validation logic here
  // For example, validate against a list of authorized tokens
  return token === process.env.MERGENT_AUTH_TOKEN;
}

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Parse the request headers to extract the authentication token
      // Extract Bearer token from request header
      const authHeader = req.headers.authorization;
      let token = "";
      if (authHeader && authHeader.startsWith("Bearer ")) {
        [, token] = authHeader.split(" ");
      }

      // Validate the authentication token
      if (!isValidAuthToken(token)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const baseUrl = process.env.NEXTAUTH_URL
        ? `${process.env.NEXTAUTH_URL}`
        : "http://localhost:3000";

      const response = await fetch(`${baseUrl}/api/services/economic-events`);
      const data: EcnomicEventsDTO = await response.json();

      const { events } = data;
      const scheduledReminders: ScheduledReminderObject[] = createScheduledReminderObjects(events);

      const mergentSchedulerModel = new MergentSchedulerModel();
      const result = await mergentSchedulerModel.createBatchTasks(scheduledReminders);

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UnableToCreateTasks":
            res.status(500).json(resultError);
            break;
          default:
            res.status(500).json(resultError);
            break;
        }
        console.log(resultError);
      }

      // const resultSuccess = Result.getValue(result);

      res
        .status(200)
        .json({ message: "Sucessfully registered events", events: scheduledReminders });
    } catch (err) {
      // Report the error to metrics + logging app
      console.log(err);
      res.status(500);
    }

    return null;
  }
};

export default async function EconomicEventsNotificationSchedulerController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
