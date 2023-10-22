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

  // Implement the rest of the methods like createOrRetrieveCustomer, copyBillingDetailsToCustomer, and manageSubscriptionStatusChange using MongoDB operations.

  // async createOrRetrieveCustomer({ email, uuid }) {
  //   try {
  //     const customerData = {
  //       metadata: { supabaseUUID: uuid },
  //       email: email || null
  //     };

  //     // Check if the customer exists
  //     const existingCustomer = await this.customerCollection.findOne({ id: uuid });

  //     if (!existingCustomer) {
  //       // Create a new customer in MongoDB
  //       const customer = await this.stripe.customers.create(customerData);

  //       // Insert the customer ID into MongoDB
  //       await this.customerCollection.insertOne({
  //         id: uuid,
  //         stripe_customer_id: customer.id
  //       });

  //       console.log(`New customer created and inserted for ${uuid}.`);
  //       return customer.id;
  //     }
  //     return existingCustomer.stripe_customer_id;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  // async copyBillingDetailsToCustomer(uuid, payment_method) {
  //   try {
  //     if (!payment_method.billing_details || !payment_method.customer) {
  //       return;
  //     }

  //     const { customer } = payment_method;
  //     const { name, phone, address } = payment_method.billing_details;

  //     if (!name || !phone || !address) {
  //       return;
  //     }

  //     await this.stripe.customers.update(customer, { name, phone, address });

  //     await this.userCollection.updateOne(
  //       { id: uuid },
  //       {
  //         $set: {
  //           billing_address: { ...address },
  //           payment_method: { ...payment_method[payment_method.type] }
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  // async manageSubscriptionStatusChange(subscriptionId, customerId, createAction = false) {
  //   try {
  //     const customerData = await this.customerCollection.findOne({
  //       stripe_customer_id: customerId
  //     });

  //     if (!customerData) {
  //       throw new Error(`Customer not found for stripe_customer_id: ${customerId}`);
  //     }

  //     const { id: uuid } = customerData;
  //     const subscription = await this.stripe.subscriptions.retrieve(subscriptionId, {
  //       expand: ["default_payment_method"]
  //     });

  //     const subscriptionData = {
  //       id: subscription.id,
  //       user_id: uuid,
  //       metadata: subscription.metadata || {},
  //       status: subscription.status,
  //       price_id: subscription.items.data[0].price.id,
  //       quantity: subscription.quantity || 1,
  //       cancel_at_period_end: subscription.cancel_at_period_end || false,
  //       cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
  //       canceled_at: subscription.canceled_at
  //         ? toDateTime(subscription.canceled_at).toISOString()
  //         : null,
  //       current_period_start: toDateTime(subscription.current_period_start).toISOString(),
  //       current_period_end: toDateTime(subscription.current_period_end).toISOString(),
  //       created: toDateTime(subscription.created).toISOString(),
  //       ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
  //       trial_start: subscription.trial_start
  //         ? toDateTime(subscription.trial_start).toISOString()
  //         : null,
  //       trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null
  //     };

  //     await this.subscriptionCollection.updateOne(
  //       { id: subscription.id },
  //       {
  //         $set: subscriptionData
  //       },
  //       { upsert: true }
  //     );

  //     console.log(`Inserted/updated subscription [${subscription.id}] for user [${uuid}]`);

  //     if (createAction && subscription.default_payment_method && uuid) {
  //       await this.copyBillingDetailsToCustomer(uuid, subscription.default_payment_method);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
}

export default SubscriptionProductModel;
