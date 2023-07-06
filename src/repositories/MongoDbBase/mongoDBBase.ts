import { Db, ObjectId, WithId } from "mongodb";
import isEmptyDataItem from "../../util/type-gaurds";

/**
 * Options for configuring the `MongoBase` class.
 */
interface IMongoBaseOptions {
  db: Db; // MongoDB database connection
  collectionName: string; // Name of the MongoDB collection
}

/**
 * Base class for MongoDB operations.
 */
export default class MongoBase {
  protected db: Db; // MongoDB database connection

  protected collectionName: string; // Name of the MongoDB collection

  /**
   * Create an instance of `MongoBase`.
   * @param options - Configuration options.
   */
  constructor(options: IMongoBaseOptions) {
    this.db = options.db;
    this.collectionName = options.collectionName;
  }

  /**
   * Check if a document exists in the collection based on the provided query.
   * @param query - The query to match documents.
   * @returns A Promise that resolves to a boolean indicating whether the document exists.
   */
  protected async exists(query = {}): Promise<boolean> {
    const getQuery = await this.get(query);
    return !isEmptyDataItem(getQuery);
  }

  /**
   * Save a document to the collection.
   * @param doc - The document to be saved.
   * @returns A Promise that resolves to a boolean indicating the success of the operation.
   */
  protected async save<T>(doc: T): Promise<boolean> {
    // Save the document to the database collection
    const result = await this.db.collection(this.collectionName).insertOne(doc);

    const normalizeResult = Boolean(result.acknowledged && result.insertedId);
    // Return a boolean indicating the success of the operation
    return normalizeResult;
  }

  /**
   * Retrieve a document from the collection based on the provided query.
   * @param query - The query to match documents.
   * @param projection - The fields to include or exclude from the result.
   * @returns A Promise that resolves to the retrieved document or null if not found.
   */
  protected async get<T>(query = {}, projection = {}): Promise<WithId<T> | null> {
    return this.db
      .collection<T>(this.collectionName)
      .findOne(query, projection)
      .then(document => document || null);
  }

  /**
   * Delete a document from the collection based on the provided query.
   * @param query - The query to match documents.
   * @returns A Promise that resolves to a boolean indicating the success of the operation.
   */
  protected async delete(query = {}): Promise<boolean> {
    const result = await this.db.collection(this.collectionName).deleteOne(query);
    let isDeleted = false;
    if (result?.deletedCount) {
      isDeleted = true;
    } else if (!result?.deletedCount) {
      isDeleted = false;
    }
    return isDeleted;
  }

  /**
   * Convert a document to a MongoDB document format by adding an ObjectId.
   * @param document - The document to be converted.
   * @returns The converted document with the added ObjectId.
   */
  protected toMongoDB<T>(document: T): {
    _id: ObjectId;
  } & T {
    return { _id: new ObjectId(), ...document };
  }

  /**
   * Convert a string ID to a MongoDB ObjectId.
   * @param id - The string ID to be converted.
   * @returns The converted ObjectId.
   */
  protected convertToMongoDBObject(id: string): ObjectId {
    return new ObjectId(id);
  }
}
