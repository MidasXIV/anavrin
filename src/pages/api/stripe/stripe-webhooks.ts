import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "node:stream/consumers";
import stripe from "../../../lib/stripe";
import createHandlers from "../../../lib/rest-utils";
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord
} from "../../../services/stripe-services";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "checkout.session.expired" /* Send "abandoned-cart" email with checkout recovery link */,
  "stripe.checkout.session.async_payment_succeeded",
  "customer.subscription.created",
  "customer.subscription.updated" /* called when initiating a "cancel_at_period_end" cancellation */,
  "customer.subscription.deleted" /* revoke acess + send win-back email */,
  "customer.subscription.trial_will_end",
  "invoice.payment_action_required",
  "invoice.payment_failed" /* Send email with invoice link */
]);

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    let event: Stripe.Event;
    console.log("Stripe - webhook");
    try {
      const buf = await buffer(req);
      const sig = req.headers["stripe-signature"] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!sig || !webhookSecret) return;
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      // res.writeHead(400, `Webhook Error: ${err.message}`).end();
      res.status(400).json({
        message: "Webhook signature verification failed"
      });
    }

    console.log(event.type);
    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case "product.created":
          case "product.updated": {
            const isProductCreated = await upsertProductRecord(event.data.object as Stripe.Product);
            console.log(event.data.object, isProductCreated);
            // if (isPriceCreated) {
            //   console.log("Product successfully created");
            // } else {
            //   console.log("Product couldn't be saved to database");
            // }
            break;
          }
          case "price.created":
          case "price.updated": {
            const isPriceCreated = await upsertPriceRecord(event.data.object as Stripe.Price);
            console.log(event.data.object, isPriceCreated);
            break;
          }
          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              event.type === "customer.subscription.created"
            );
            break;
          }
          case "checkout.session.completed": {
            const checkoutSession = event.data.object as Stripe.Checkout.Session;
            if (checkoutSession.mode === "subscription") {
              const subscriptionId = checkoutSession.subscription;
              await manageSubscriptionStatusChange(
                subscriptionId as string,
                checkoutSession.customer as string,
                true
              );
            }
            break;
          }
          default:
            throw new Error("Unhandled relevant event!");
        }
      } catch (error) {
        console.log(error);
        res.writeHead(400, "Webhook handler failed. View your nextjs function logs.").end();
      }
    }
    res.status(200).send("Webhook processed by Anavrin");
  }
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function WebhookStripe(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
