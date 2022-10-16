import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  CreateDeletePushSubscriptionController,
  DeletePushSubscription
} from "../../../controllers/deletePushSubscription";

import connectToDatabase from "../../../lib/mongodb";
import createHandlers from "../../../lib/rest-utils";
import UserModel from "../../../repositories/UserModel/userModel";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const db = await connectToDatabase();

    const userModel = new UserModel(db);
    const deletePushSubscription = new DeletePushSubscription(userModel, session);
    const deletePushSubscriptionController = new CreateDeletePushSubscriptionController(
      deletePushSubscription
    );

    await deletePushSubscriptionController.execute(req, res);
  }
};

export default async function DeletePushSubscriptionController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
