/**
 * The SaveUserPortfolio class is responsible for handling the
 * logic to save a user's portfolio in the database. It takes in a portfolio object
 * and checks whether the user is logged in, whether the user has reached the
 * maximum number of portfolios, and updates the user's portfolio accordingly.
 * It implements the `ISaveUserPortfolio` interface.
 */

import { Session } from "next-auth";
import Result from "../../lib/result";

export default class SaveUserPortfolio implements ISaveUserPortfolio {
  private userRepo: IUserPortfolioModel;

  private session: Session;

  constructor(userRepo: IUserPortfolioModel, session: Session) {
    this.userRepo = userRepo;
    this.session = session;
  }

  public async execute(portfolio: Portfolio): Promise<SaveUserPortfolioResponse> {
    // Assume a valid portfolio is passed.
    // Assume a valid user makes this request.
    // subscriptions need to be saved under user
    // User at max can have only 2 porfolios.
    try {
      const isSignedIn = Boolean(this.session?.user) ?? false;

      if (!isSignedIn) {
        return Result.fail({ type: "UserNotLoggedIn" });
      }

      const user = this.session.user.email;

      // Fetch User subscriptions
      const userPortfolios = await this.userRepo.getUserPortfolio(user);

      // IF less than 2 update subscription.
      if (userPortfolios.length >= 2) {
        return Result.fail({ type: "MaxPortfoliosReached" });
      }

      const updateUserResult = await this.userRepo.addUserPortfolioItem(user, portfolio);
      if (!updateUserResult) {
        return Result.fail({ type: "FailedToUpdatePortfolio" });
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
