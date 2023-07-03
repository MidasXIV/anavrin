import { Db } from "mongodb";
import MongoBase from "../MongoDbBase/mongoDBBase";

export default class EmailListModel extends MongoBase implements IEmailListModel {
  constructor(db: Db) {
    super({ db, collectionName: "emailList" });
  }

  public async saveEmail(email: string): Promise<boolean> {
    const result = await this.save({ email });
    return result;
  }

  public async existsEmail(email: string): Promise<boolean> {
    const result = await this.exists({ email });
    return result;
  }
}
