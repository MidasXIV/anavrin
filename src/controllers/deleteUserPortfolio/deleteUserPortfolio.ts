import { Session } from "next-auth";
import Result from "../../lib/result";

export default class DeleteUserPortfolio implements IDeleteUserPortfolio {
  private userRepo: IUserPortfolioModel;

  private session: Session;

  constructor(userRepo: IUserPortfolioModel, session: Session) {
    this.userRepo = userRepo;
    this.session = session;
  }

  public async execute(portfolio: Portfolio): Promise<DeleteUserPortfolioResponse> {
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
      if (userPortfolios.length <= 0) {
        return Result.fail({ type: "NoMatchingPortfolio" });
      }

      const isUserPortfolioPresent = userPortfolios.some(userPortfolio =>
        userPortfolio._id.equals(portfolio._id)
      );

      if (!isUserPortfolioPresent) {
        return Result.fail({ type: "NoMatchingPortfolio" });
      }

      const deleteUserPortfolioResult = await this.userRepo.deleteUserPortfolioItem(
        user,
        // eslint-disable-next-line no-underscore-dangle
        portfolio._id
      );

      if (!deleteUserPortfolioResult?.ok) {
        return Result.fail({ type: "FailedToDeletePortfolio" });
      }

      return Result.ok({
        ...deleteUserPortfolioResult
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
