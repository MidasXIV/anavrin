import Stripe from "stripe";
import connectToDatabase from "../lib/mongodb";
import SubscriptionProductModel from "../repositories/SubscriptionPricingModel/subscriptionProductModel";
import SubscriptionPriceModel from "../repositories/SubscriptionPricingModel/subscriptionPriceModel";

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
