import { NextApiRequest, NextApiResponse } from "next";

export default class CreateDividendInfoController {
  useCase;

  constructor(useCase) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse) {
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
      const result = await this.useCase.execute(ticker);

      switch (result.type) {
        case "NoDividendInfo":
          response.status(400).json(result);
        case "InvalidTicker":
          response.status(400).json(result);
        case "UnexpectedError":
          response.status(500).json(result);
        default:
          response.status(200).json(result);
      }
    } catch (err) {
      // Report the error to metrics + logging app

      return response.status(500);
    }
  }
}
