import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  CreateFetchPushSubscriptionController,
  FetchPushSubscription
} from "../../../controllers/fetchPushSubscriptions";
import connectToDatabase from "../../../lib/mongodb";
import createHandlers from "../../../lib/rest-utils";
import UserModel from "../../../repositories/UserModel/userModel";

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const db = await connectToDatabase();

    const userModel = new UserModel(db);
    const fetchPushSubscription = new FetchPushSubscription(userModel, session);
    const fetchPushSubscriptionController = new CreateFetchPushSubscriptionController(
      fetchPushSubscription
    );

    await fetchPushSubscriptionController.execute(req, res);
  }
};

export default async function FetchPushSubscriptionController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
