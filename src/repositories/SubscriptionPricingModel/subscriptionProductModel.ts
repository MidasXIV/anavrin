/* eslint-disable camelcase */
import { Db, Collection, FindOneAndUpdateOptions } from "mongodb";
import Stripe from "stripe";
import MongoBase from "../MongoDbBase/mongoDBBase";
import stripe from "../../lib/stripe";

interface ProductDocument {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  image: string | null;
  metadata: Record<string, any>;
}

class SubscriptionProductModel extends MongoBase {
  constructor(db: Db) {
    super({ db, collectionName: "saas-subscription-product" });
  }

  async createStripeProduct(productData): Promise<Document> {
    const product = await stripe.products.create(productData);

    console.log(`Success! Here is your starter subscription product id: ${product.id}`);

    const result = await this.upsertSubscriptionProduct(product);
    return result;
  }

  async upsertSubscriptionProduct(productData: Stripe.Product): Promise<Document> {
    const product: ProductDocument = {
      id: productData.id,
      active: productData.active,
      name: productData.name,
      description: productData.description || null,
      image: productData.images?.[0] || null,
      metadata: productData.metadata || {}
    };

    // await this.productCollection.updateOne(
    //   { id: product.id },
    //   { $set: productData },
    //   { upsert: true }
    // );
    const query = { id: product.id };
    const update = { $set: product };
    const options: FindOneAndUpdateOptions = { upsert: true, returnDocument: "after" };

    const result = await this.upsert(query, update, options);
    // const result = await this.save(product);
    return result as Document;
  }

  public async getSubscriptionProductRecord(id: string): Promise<ProductDocument> {
    const query = { id };
    const projection = {};
    const ProductDocument: ProductDocument = await this.get(query, projection);
    return ProductDocument;
  }

  public async getAllSubscriptionProductRecords(): Promise<Array<ProductDocument>> {
    const query = {};
    const projection = {};
    const productDocumentFindCursor = await this.getAll(query, projection);
    const productDocuments = await productDocumentFindCursor.toArray();
    return productDocuments as any as Array<ProductDocument>;
  }
}

export default SubscriptionProductModel;
