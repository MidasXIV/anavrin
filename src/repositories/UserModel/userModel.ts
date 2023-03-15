import { Db, Document, FindOneAndUpdateOptions, ModifyResult, ObjectId } from "mongodb";
import { isEmpty } from "../../util/helper";

export default class UserModel implements IUserModel {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  private toMongoDB<T>(document: T) {
    return { _id: new ObjectId(), ...document };
  }

  private convertToMongoDBObject(id: string) {
    return new ObjectId(id);
  }

  private async get(query = {}, projection = {}): Promise<UserDocument> {
    return this.db
      .collection("users")
      .findOne(query, projection)
      .then(user => user || null);
  }

  // public async update(user: User): Promise<boolean> {}

  // public async exists(t: User): Promise<boolean> {}

  public async delete(email: string): Promise<boolean> {
    const query = { email };
    const result = await this.db.collection("users").deleteOne(query);
    let isDeleted = false;
    if (result && result.deletedCount) {
      //   res.status(202).send(`Successfully removed game with email ${email}`);
      isDeleted = true;
    } else if (!result) {
      //   res.status(400).send(`Failed to remove game with email ${email}`);
      isDeleted = false;
    } else if (!result.deletedCount) {
      //   res.status(404).send(`Game with email ${email} does not exist`);
      isDeleted = false;
    }
    return isDeleted;
  }

  public async getUserById(userId: string): Promise<UserDocument> {
    const query = { _id: new ObjectId(userId) };
    const projection = {};
    return this.get(query, projection);
  }

  public async getUserByEmail(email: string): Promise<UserDocument> {
    const query = { email };
    const projection = {};
    return this.get(query, projection);
  }

  public async getUserSubscription(email: string): Promise<Array<PushSubscription>> {
    const query = { email };
    const projection = { projection: { subscriptions: 1, _id: 0 } };
    const pushSubscriptionsDocument = await this.get(query, projection);
    if (isEmpty(pushSubscriptionsDocument)) {
      return [];
    }
    return pushSubscriptionsDocument.subscriptions;
  }

  public async updateUserSubscription(
    email: string,
    subscription: Array<PushSubscription>
  ): Promise<ModifyResult<Document>> {
    const query = { email };
    const update = { $set: { subscriptions: subscription } };
    const options: FindOneAndUpdateOptions = { upsert: true, returnDocument: "after" };

    return this.db.collection("users").findOneAndUpdate(query, update, options);
  }

  public async addUserSubscription(
    email: string,
    subscription: PushSubscription
  ): Promise<boolean> {
    const subscriptionDocument = this.toMongoDB(subscription);

    const query = { email };
    const update = { $push: { subscriptions: subscriptionDocument } };
    const options: FindOneAndUpdateOptions = { upsert: true, returnDocument: "after" };

    const updateResult = await this.db.collection("users").updateOne(query, update, options);
    return Boolean(updateResult.matchedCount && updateResult.modifiedCount);
  }

  public async deleteUserSubscription(email: string, subscriptionId: string): Promise<boolean> {
    const documentId = this.convertToMongoDBObject(subscriptionId);
    const query = { email };
    const update = { $pull: { subscriptions: { _id: documentId } } };
    const options = { returnDocument: "after" };

    const updateResult = await this.db.collection("users").updateOne(query, update);

    return Boolean(updateResult.matchedCount && updateResult.modifiedCount);
  }
}
