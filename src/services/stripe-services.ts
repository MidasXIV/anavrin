import Stripe from "stripe";
import connectToDatabase from "../lib/mongodb";
import SubscriptionProductModel from "../repositories/SubscriptionPricingModel/subscriptionProductModel";
import SubscriptionPriceModel from "../repositories/SubscriptionPricingModel/subscriptionPriceModel";
import UserModel from "../repositories/UserModel/userModel";
import stripe from "../lib/stripe";
import { toDateTime } from "../util/timeAndDateHelpers";

export const upsertProductRecord = async (product: Stripe.Product): Promise<Document> => {
  const db = await connectToDatabase();
  const subscriptionProductModel = new SubscriptionProductModel(db);
  const isProductCreated = await subscriptionProductModel.upsertSubscriptionProduct(product);
  return isProductCreated;
};

export const upsertPriceRecord = async (price: Stripe.Price): Promise<Document> => {
  const db = await connectToDatabase();
  const subscriptionPriceModel = new SubscriptionPriceModel(db);
  const isPriceCreated = await subscriptionPriceModel.upsertSubscriptionPrice(price);
  return isPriceCreated;
};

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
): Promise<void> => {
  const db = await connectToDatabase();
  const userModel = new UserModel(db);
  const subscriptionPriceModel = new SubscriptionPriceModel(db);
  const subscriptionProductModel = new SubscriptionProductModel(db);

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  });

  const priceId = subscription.items.data[0].price.id;
  const price = await subscriptionPriceModel.getSubscriptionPriceRecord(priceId);

  const productId = price.product_id;
  const product = await subscriptionProductModel.getSubscriptionProductRecord(productId);

  const subscriptionData = {
    id: subscription.id,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    // TODO check quantity on subscription
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(subscription.current_period_start).toISOString(),
    current_period_end: toDateTime(subscription.current_period_end).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null,
    prices: { ...price, products: product }
  };

  const updatedResult = await userModel.manageSubscriptionStatusChange(
    subscriptionData,
    customerId,
    createAction
  );
  console.log(updatedResult);
};
