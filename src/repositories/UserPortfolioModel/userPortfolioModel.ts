/* eslint-disable no-underscore-dangle */
import { Db, FindOneAndUpdateOptions, UpdateResult } from "mongodb";
import isEmpty from "../../util/helper";
import MongoBase from "../MongoDbBase/mongoDBBase";

// UserPortfolioModel implements the IUserPortfolioModel interface
class UserPortfolioModel extends MongoBase implements IUserPortfolioModel {
  private db: Db;

  private collectionName = "users";

  constructor(db: Db) {
    super();
    this.db = db;
  }

  // Retrieves a user document from the "users" collection with the given query and projection
  private async get(query = {}, projection = {}): Promise<UserDocument> {
    return this.db
      .collection(this.collectionName)
      .findOne(query, projection)
      .then(user => user || null);
  }

  // Retrieves a user's portfolio from the "users" collection with the given email address
  public async getUserPortfolio(email: string): Promise<Array<Portfolio>> {
    const query = { email };
    const projection = { projection: { portfolios: 1, _id: 0 } };
    const portfolioDocument = await this.get(query, projection);
    if (isEmpty(portfolioDocument)) {
      return [];
    }
    return portfolioDocument.portfolios;
  }

  /**
   * Updates a single portfolio item of a user.
   * @param {string} email - The email of the user to update the portfolio item for.
   * @param {Portfolio} portfolio - The portfolio item to update.
   * @returns {Promise<{ value: Portfolio; ok: boolean }>} An object with the updated portfolio
   * item and a boolean indicating whether the update was successful.
   */
  public async updateUserPortfolio(
    email: string,
    portfolio: Portfolio
  ): Promise<{
    value: Portfolio;
    ok: boolean;
  }> {
    // eslint-disable-next-line no-param-reassign
    portfolio._id = this.convertToMongoDBObject(portfolio._id);
    const query = {
      email,
      portfolios: { $elemMatch: { _id: portfolio._id } }
    };
    const update = { $set: { "portfolios.$": portfolio } };
    const options: FindOneAndUpdateOptions = {
      upsert: true,
      returnDocument: "after",
      projection: {
        _id: 0,
        portfolios: { $elemMatch: { _id: portfolio._id } }
      }
    };

    // Updates the document matching the query and returns the updated document
    const updateResult = await this.db
      .collection(this.collectionName)
      .findOneAndUpdate(query, update, options);

    return {
      value: updateResult?.value?.portfolios[0] ?? {},
      ok: Boolean(updateResult.ok)
    };
  }

  /**
   * Add a portfolio item to a user's portfolio array in the database.
   * @param {string} email - Email address of the user.
   * @param {Portfolio} item - Portfolio item to add to the user's portfolio array.
   * @returns {Promise<UpdateResult & { value: Portfolio; ok: boolean }>} - A promise that resolves
   * with an object containing the update result, a boolean indicating if the update was successful,
   * and the value of the added portfolio item.
   */
  public async addUserPortfolioItem(
    email: string,
    item: Portfolio
  ): Promise<UpdateResult & { value: Portfolio; ok: boolean }> {
    const itemDocument = item._id ? item : this.toMongoDB(item);

    const query = { email };
    const update = { $push: { portfolios: itemDocument } };
    const options: FindOneAndUpdateOptions = { upsert: false, returnDocument: "after" };

    const updateResult = await this.db
      .collection(this.collectionName)
      .updateOne(query, update, options);
    // return Boolean(updateResult.matchedCount && updateResult.modifiedCount);
    return {
      ...updateResult,
      ok: Boolean(updateResult.matchedCount && updateResult.modifiedCount),
      value: itemDocument
    };
  }

  // Deletes a portfolio item from a user's portfolio with the given email address and item ID
  public async deleteUserPortfolioItem(email: string, itemId: string): Promise<boolean> {
    const documentId = this.convertToMongoDBObject(itemId);
    const query = { email };
    const update = { $pull: { portfolios: { _id: documentId } } };
    const options = { returnDocument: "after" };

    // Updates the document matching the query and returns a boolean indicating if the update was successful
    const updateResult = await this.db.collection(this.collectionName).updateOne(query, update);

    return Boolean(updateResult.matchedCount && updateResult.modifiedCount);
  }
}

export default UserPortfolioModel;
