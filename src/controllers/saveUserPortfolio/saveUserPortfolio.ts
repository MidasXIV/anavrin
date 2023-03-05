import { Session } from "next-auth";
import Result from "../../lib/result";

/**
 * `SaveUserPortfolio` is a class that implements the `ISaveUserPortfolio` interface,
 * which defines a contract for saving a user's portfolio. This class interacts with
 * a MongoDB database through the `IUserPortfolioModel` repository to add or update a
 * user's portfolio. The `execute` method takes a `Portfolio` object and saves it to the
 * database if the user is signed in and has less than 2 portfolios. If the user already
 * has a portfolio with the same ID as the one being saved, the existing portfolio is
 * updated instead. If any error occurs during the execution, a `Result` object is returned
 * with a failure type and an error message.
 */
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

      // Fetch User portfolios
      const userPortfolios = await this.userRepo.getUserPortfolio(user);

      // If more than 2 portfolios do not save portfolio.
      if (userPortfolios.length >= 2) {
        return Result.fail({ type: "MaxPortfoliosReached" });
      }

      const isUserPortfolioPresent = userPortfolios.some(userPortfolio =>
        // eslint-disable-next-line no-underscore-dangle
        userPortfolio._id.equals(portfolio._id)
      );

      let updateUserPortfolioResult: {
        value: Portfolio;
        ok: boolean;
      };

      // if the portfolio exists update instead of upsert.
      if (isUserPortfolioPresent) {
        updateUserPortfolioResult = await this.userRepo.updateUserPortfolio(user, portfolio);
      } else {
        updateUserPortfolioResult = await this.userRepo.addUserPortfolioItem(user, portfolio);
      }

      if (!updateUserPortfolioResult?.ok) {
        return Result.fail({ type: "FailedToUpdatePortfolio" });
      }

      return Result.ok({
        ...updateUserPortfolioResult
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
