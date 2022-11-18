import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  SaveSubscription,
  CreateSaveSubscriptionController
} from "../../../controllers/saveSubscription";
import connectToDatabase from "../../../lib/mongodb";
import createHandlers from "../../../lib/rest-utils";
import UserModel from "../../../repositories/UserModel/userModel";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const db = await connectToDatabase();

    const userModel = new UserModel(db);
    const saveSubscription = new SaveSubscription(userModel, session);
    const saveSubscriptionController = new CreateSaveSubscriptionController(saveSubscription);

    await saveSubscriptionController.execute(req, res);
  }
};

export default async function SaveSubscriptionController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
