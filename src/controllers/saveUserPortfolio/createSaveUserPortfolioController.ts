/**
 * Controllers are responsible for
 * * Parsing request and validating the params; Passing to the useCase;
 * * Hanlding error codes from the useCase;
 * * Mapping the data to DTO or persistence.
 */
import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateSaveUserPortfolioController {
  useCase: ISaveUserPortfolio;

  constructor(useCase: ISaveUserPortfolio) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const { portfolio } = request.body;

    if (!portfolio) {
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
          case "MaxPortfoliosReached":
            response.status(403).json(result);
            break;
          case "FailedToUpdatePortfolio":
            response.status(500).json(result);
            break;
          default:
            response.status(500).json(result);
            break;
        }
      }

      const resultSuccess = Result.getValue(result);
      response.status(201).json(resultSuccess);
    } catch (err) {
      // Report the error to metrics + logging app
      response.status(500);
    }
  }
}
