/**
 * `FetchUserPortfolio` is a class that fetches a user's portfolio from the database.
 * It implements the `IFetchUserPortfolio` interface.
 */

import { Session } from "next-auth";
import Result from "../../lib/result";

export default class FetchUserPortfolio implements IFetchUserPortfolio {
  private userPortfolioModel: IUserPortfolioModel;

  private session: Session;

  constructor(userPortfolioModel: IUserPortfolioModel, session: Session) {
    this.userPortfolioModel = userPortfolioModel;
    this.session = session;
  }

  public async execute(): Promise<FetchUserPortfolioResponse> {
    try {
      const isSignedIn = Boolean(this.session?.user) ?? false;
      if (!isSignedIn) {
        return Result.fail({ type: "UserNotLoggedIn" });
      }

      // Fetch the user's portfolio from the database
      const user = this.session.user.email;
      const userPortfolios = await this.userPortfolioModel.getUserPortfolio(user);

      // Return an empty array or the user's portfolio
      return Result.ok({
        portfolios: userPortfolios
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
