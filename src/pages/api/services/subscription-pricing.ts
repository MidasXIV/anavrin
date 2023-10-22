import { NextApiRequest, NextApiResponse } from "next";
import createHandlers from "../../../lib/rest-utils";
import connectToDatabase from "../../../lib/mongodb";
import SubscriptionPriceModel from "../../../repositories/SubscriptionPricingModel/subscriptionPriceModel";
import SubscriptionProductModel from "../../../repositories/SubscriptionPricingModel/subscriptionProductModel";

const combineProductsAndPrices = (products, prices) => {
  const productMap = {};

  // Create a dictionary mapping products by their "id"
  products.forEach(product => {
    productMap[product.id] = { ...product, prices: [] };
  });

  // Append prices to their corresponding products
  prices.forEach(price => {
    if (productMap[price.product_id]) {
      productMap[price.product_id].prices.push(price);
    }
  });

  // Convert the dictionary values back to an array
  const combinedProducts = Object.values(productMap);

  return combinedProducts;
};

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const db = await connectToDatabase();
      const subscriptionPriceModel = new SubscriptionPriceModel(db);
      const subscriptionProductModel = new SubscriptionProductModel(db);

      const products = await subscriptionProductModel.getAllSubscriptionProductRecords();
      const prices = await subscriptionPriceModel.getAllSubscriptionPriceRecords();

      const productsWithPrices = combineProductsAndPrices(products, prices);

      res.status(200).json(productsWithPrices);
    } catch (err) {
      // Report the error to metrics + logging app
      res.status(500);
    }
  }
};

export default async function SubscriptionPricingController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
