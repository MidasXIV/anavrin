/**
 * Controllers are responsible for
 * * Parsing request and validating the params; Passing to the useCase;
 * * Hanlding error codes from the useCase;
 * * Mapping the data to DTO or persistence.
 */
import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateDeleteUserPortfolioController {
  useCase: IDeleteUserPortfolio;

  constructor(useCase: IDeleteUserPortfolio) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const { portfolio } = request.body;

    console.log(portfolio);
    if (!portfolio || !portfolio._id) {
      return response.status(400).json({
        message: `Portfolio not present`
      });
    }

    try {
      const result = await this.useCase.execute(portfolio);

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UserNotLoggedIn":
            response.status(401);
            break;
          case "NoMatchingPortfolio":
            response.status(403);
            break;
          case "FailedToDeletePortfolio":
            response.status(500);
            break;
          default:
            response.status(500);
            break;
        }
        response.json(resultError);
        return null;
      }

      const resultSuccess = Result.getValue(result);
      response.status(200).json(resultSuccess);
    } catch (err) {
      // Report the error to metrics + logging app
      response.status(500);
    }
    return null;
  }
}
