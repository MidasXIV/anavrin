import { Session } from "next-auth";
import Result from "../../lib/result";

export default class FetchPushSubscription implements IFetchPushSubscription {
  private userModel: IUserModel;

  private session: Session;

  constructor(userModel: IUserModel, session: Session) {
    this.userModel = userModel;
    this.session = session;
  }

  public async execute(): Promise<FetchPushSubscriptionResponse> {
    try {
      const isSignedIn = Boolean(this.session?.user) ?? false;
      if (!isSignedIn) {
        return Result.fail({ type: "UserNotLoggedIn" });
      }

      const user = this.session.user.email;

      // Fetch User subscriptions
      const pushSubscriptions = await this.userModel.getUserSubscription(user);

      // Return Empty Array or the subscriptions.
      return Result.ok({
        subscriptions: pushSubscriptions
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
