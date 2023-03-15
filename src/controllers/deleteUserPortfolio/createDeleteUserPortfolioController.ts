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
            response.status(401).json(result);
            break;
          case "NoMatchingPortfolio":
            response.status(403).json(result);
            break;
          case "FailedToDeletePortfolio":
            response.status(500).json(result);
            break;
          default:
            response.status(500).json(result);
            break;
        }
      }

      const resultSuccess = Result.getValue(result);
      response.status(200).json(resultSuccess);
    } catch (err) {
      // Report the error to metrics + logging app
      response.status(500);
    }
    return response.status(500).json(undefined);
  }
}
