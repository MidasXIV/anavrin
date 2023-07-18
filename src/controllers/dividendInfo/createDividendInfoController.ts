import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateDividendInfoController {
  useCase: IDividendInfo;

  constructor(useCase: IDividendInfo) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const ticker = Array.isArray(request.query.ticker)
      ? request.query.ticker[0]
      : request.query.ticker;

    // Validation logic goes here
    if (!ticker) {
      return response.status(400).json({
        message: `Ticker not present`
      });
    }

    try {
      const result: DividendInfoResponse = await this.useCase.execute(ticker);

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "NoDividendInfo":
            response.status(400);
            break;
          case "InvalidTicker":
            response.status(400);
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
