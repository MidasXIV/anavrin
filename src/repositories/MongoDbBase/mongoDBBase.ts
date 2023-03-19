import { ObjectId } from "mongodb";

export default class MongoBase {
  protected toMongoDB<T>(document: T): {
    _id: ObjectId;
  } & T {
    return { _id: new ObjectId(), ...document };
  }

  protected convertToMongoDBObject(id: string): ObjectId {
    return new ObjectId(id);
  }
}
