import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";
import createHandlers from "../../../lib/rest-utils";

const handlers = {
  GET: async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      const ticker = Array.isArray(request.query.ticker)
        ? request.query.ticker[0]
        : request.query.ticker;

      // Validation logic goes here
      if (!ticker) {
        return response.status(400).json({
          message: `Ticker not present`
        });
      }

      const result = await yahooFinance.search(ticker, {
        newsCount: 0
      });

      response.status(200).json(result?.quotes);
    } catch (err) {
      // Report the error to metrics + logging app
      response.status(500);
    }
    return null;
  }
};

export default async function yahooFinanceAutoCompleteController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
