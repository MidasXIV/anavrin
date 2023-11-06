import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/mongodb";
import UserModel from "../../../repositories/UserModel/userModel";
import createHandlers from "../../../lib/rest-utils";

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const db = await connectToDatabase();
    const userModel = new UserModel(db);

    const { email } = session?.user;
    try {
      const subscription = await userModel.getSubscription(email);
      console.log(subscription);
      res.status(200).json(subscription);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  }
};

export default async function userSubscriptionController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
