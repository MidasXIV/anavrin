import { NextApiRequest, NextApiResponse } from "next";
import { CreateSubscribeUserController, SubscribeUser } from "../../../controllers/subscribeUser";

import connectToDatabase from "../../../lib/mongodb";
import createHandlers from "../../../lib/rest-utils";
import EmailListModel from "../../../repositories/EmailListModel/emailListModel";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await connectToDatabase();

    const emailListModel = new EmailListModel(db);
    const subscribeUser = new SubscribeUser(emailListModel);
    const createSubscribeUserController = new CreateSubscribeUserController(subscribeUser);

    await createSubscribeUserController.execute(req, res);
  }
};

export default async function DeletePushSubscriptionController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
