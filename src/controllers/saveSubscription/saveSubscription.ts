import { Session } from "next-auth";
import Result from "../../lib/result";

export default class SaveSubscription implements ISaveSubscription {
  private userRepo: IUserModel;

  private session: Session;

  constructor(userRepo: IUserModel, session: Session) {
    this.userRepo = userRepo;
    this.session = session;
  }

  public async execute(subscription: PushSubscription): Promise<SaveSubscriptionResponse> {
    // Assume a valid subscription is passed.
    // Assume a valid user makes this request.
    // subscriptions need to be saved under user
    // User at max can have only 2 pushSubscriptions.
    try {
      const isSignedIn = Boolean(this.session?.user) ?? false;

      if (!isSignedIn) {
        return Result.fail({ type: "UserNotLoggedIn" });
      }

      const user = this.session.user.email;

      // Fetch User subscriptions
      const pushSubscriptions = await this.userRepo.getUserSubscription(user);

      // IF less than 2 update subscription.
      if (pushSubscriptions.length >= 2) {
        return Result.fail({ type: "MaxSubscriptionsReached" });
      }

      const updateUserResult = await this.userRepo.addUserSubscription(user, subscription);
      if (!updateUserResult) {
        return Result.fail({ type: "FailedToUpdateSubscription" });
      }

      return Result.ok({
        userUpdated: updateUserResult
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
