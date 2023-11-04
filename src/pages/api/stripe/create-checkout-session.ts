import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import createHandlers from "../../../lib/rest-utils";
import stripe from "../../../lib/stripe";
import { getURL } from "../../../util/helper";
import connectToDatabase from "../../../lib/mongodb";
import UserModel from "../../../repositories/UserModel/userModel";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    // 1. Destructure the price and quantity from the POST body
    const { price, quantity = 1, metadata = {} } = await req.body;
    // 2. Get the user from session
    const { user } = await getSession({ req });
    const db = await connectToDatabase();

    const userModel = new UserModel(db);

    console.log(price);
    try {
      // 3. Retrieve or create the customer in Stripe
      const customer = await userModel.createOrRetrieveCustomer({
        email: user?.email || ""
      });

      // 4. Create a checkout session in Stripe
      let session;
      if (price.type === "recurring") {
        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          billing_address_collection: "required",
          customer,
          customer_update: {
            address: "auto"
          },
          line_items: [
            {
              price: price.id,
              quantity
            }
          ],
          mode: "subscription",
          allow_promotion_codes: true,
          subscription_data: {
            // trial_end: 48,
            metadata
          },
          success_url: `${getURL()}/user-settings`,
          cancel_url: `${getURL()}/`
        });
      } else if (price.type === "one_time") {
        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          billing_address_collection: "required",
          customer,
          customer_update: {
            address: "auto"
          },
          line_items: [
            {
              price: price.id,
              quantity
            }
          ],
          mode: "payment",
          allow_promotion_codes: true,
          success_url: `${getURL()}/user-settings`,
          cancel_url: `${getURL()}/`
        });
      }

      if (session) {
        // return new Response(JSON.stringify({ sessionId: session.id }), {
        //   status: 200
        // });
        res.status(200).json({ sessionId: session.id });
      }
      // return new Response(
      //   JSON.stringify({
      //     error: { statusCode: 500, message: "Session is not defined" }
      //   }),
      //   { status: 500 }
      // );

      res.status(500).json({
        error: { statusCode: 500, message: "Session is not defined" }
      });
    } catch (err: any) {
      console.log(err);
      return new Response(JSON.stringify(err), { status: 500 });
    }
  }
};

export default async function CreateCheckoutSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
