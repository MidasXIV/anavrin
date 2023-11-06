/* eslint-disable camelcase */
import { Db, FindOneAndUpdateOptions } from "mongodb";
import Stripe from "stripe";
import MongoBase from "../MongoDbBase/mongoDBBase";
import stripe from "../../lib/stripe";

interface PriceDocument {
  id: string;
  product_id: string;
  active: boolean;
  currency: string;
  description: string | null;
  type: string;
  unit_amount: number | null;
  interval: string | null;
  interval_count: number | null;
  trial_period_days: number | null;
  metadata: Record<string, any>;
}

class SubscriptionPriceModel extends MongoBase {
  constructor(db: Db) {
    super({ db, collectionName: "saas-subscription-price" });
  }

  async createStripePrice(priceData: Stripe.PriceCreateParams): Promise<Document> {
    const price = await stripe.prices.create(priceData);
    console.log(`Success! Here is your starter subscription price id: ${price.id}`);

    const result = await this.upsertSubscriptionPrice(price);
    return result;
  }

  async upsertSubscriptionPrice(priceData: Stripe.Price): Promise<Document> {
    const price: PriceDocument = {
      id: priceData.id,
      product_id: typeof priceData.product === "string" ? priceData.product : "",
      active: priceData.active,
      currency: priceData.currency,
      description: priceData.nickname || null,
      type: priceData.type,
      unit_amount: priceData.unit_amount || null,
      interval: priceData.recurring?.interval || null,
      interval_count: priceData.recurring?.interval_count || null,
      trial_period_days: priceData.recurring?.trial_period_days || null,
      metadata: priceData.metadata || {}
    };

    const query = { id: price.id };
    const update = { $set: price };
    const options: FindOneAndUpdateOptions = { upsert: true, returnDocument: "after" };

    const result = await this.upsert(query, update, options);

    // const result = await this.save(price);
    return result as Document;
  }

  public async getSubscriptionPriceRecord(id: string): Promise<PriceDocument> {
    const query = { id };
    const projection = {};
    const PriceDocument: PriceDocument = await this.get(query, projection);
    return PriceDocument;
  }

  public async getAllSubscriptionPriceRecords(): Promise<Array<PriceDocument>> {
    const query = {};
    const projection = {};
    const priceDocumentFindCursor = await this.getAll(query, projection);
    const priceDocuments = await priceDocumentFindCursor.toArray();
    return priceDocuments as any as Array<PriceDocument>;
  }
}

export default SubscriptionPriceModel;
