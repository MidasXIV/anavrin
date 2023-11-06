import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import createHandlers from "../../../lib/rest-utils";
import connectToDatabase from "../../../lib/mongodb";
import UserModel from "../../../repositories/UserModel/userModel";
import stripe from "../../../lib/stripe";
import { getURL } from "../../../util/helper";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { user } = await getSession({ req });
      const db = await connectToDatabase();

      const userModel = new UserModel(db);

      const customer = await userModel.createOrRetrieveCustomer({
        email: user?.email || ""
      });

      if (!customer) throw Error("Could not get customer");
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/user-settings`
      });
      res.status(200).json({ url });
    } catch (err: any) {
      console.log(err);

      res.status(500).json({ error: { statusCode: 500, message: err.message } });
    }
  }
};

export default async function CreatePortalLink(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
