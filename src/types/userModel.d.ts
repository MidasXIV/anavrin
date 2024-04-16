interface BaseModel<T> {
  exists(param: keyof T): Promise<boolean>;
  delete(param: keyof T): Promise<boolean>;
  update(param: keyof T): Promise<unknown>;
}

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserDocument = User | WithId<Document>;

interface IUserModel {
  getUserById(userId: string): Promise<UserDocument>;
  getUserByEmail(email: string): Promise<UserDocument>;
  getUserSubscription(email: string): Promise<Array<PushSubscription>>;
  getAllUserSubscription(): Promise<Array<PushSubscription>>;
  updateUserSubscription(
    email: string,
    subscription: Array<PushSubscription>
  ): Promise<ModifyResult<Document>>;
  deleteUserSubscription(email: string, subscriptionId: string): Promise<boolean>;
  addUserSubscription(email: string, subscription: PushSubscription): Promise<boolean>;
}
