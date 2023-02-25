import { Db, FindOneAndUpdateOptions } from "mongodb";
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

  // Updates a user's portfolio with the given email address and portfolio data
  public async updateUserPortfolio(email: string, portfolio: Array<Portfolio>) {
    const query = { email };
    const update = { $set: { portfolios: portfolio } };
    const options: FindOneAndUpdateOptions = { upsert: true, returnDocument: "after" };

    // Updates the document matching the query and returns the updated document
    return this.db.collection(this.collectionName).findOneAndUpdate(query, update, options);
  }

  // Adds a portfolio item to a user's portfolio with the given email address and portfolio item data
  public async addUserPortfolioItem(email: string, item: Portfolio): Promise<boolean> {
    const itemDocument = this.toMongoDB(item);

    const query = { email };
    const update = { $push: { portfolio: itemDocument } };
    const options: FindOneAndUpdateOptions = { upsert: true, returnDocument: "after" };

    // Updates the document matching the query and returns a boolean indicating if the update was successful
    const updateResult = await this.db
      .collection(this.collectionName)
      .updateOne(query, update, options);
    return Boolean(updateResult.matchedCount && updateResult.modifiedCount);
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
