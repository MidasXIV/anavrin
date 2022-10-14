import { Session } from "next-auth";
import Result from "../../lib/result";

export default class DeletePushSubscription {
  private userModel: IUserModel;

  private session: Session;

  constructor(userModel: IUserModel, session: Session) {
    this.userModel = userModel;
    this.session = session;
  }

  public async execute(subscriptionId: string): Promise<DeletePushSubscriptionResponse> {
    try {
      const isSignedIn = Boolean(this.session?.user) ?? false;
      if (!isSignedIn) {
        return Result.fail({ type: "UserNotLoggedIn" });
      }

      const user = this.session.user.email;

      // delete User subscriptions
      const isSubscriptionDeleted = await this.userModel.deleteUserSubscription(
        user,
        subscriptionId
      );

      // Return Empty Array or the subscriptions.
      return Result.ok({
        isSubscriptionDeleted
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
