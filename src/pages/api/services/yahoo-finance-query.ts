import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";
import createHandlers from "../../../lib/rest-utils";

const handlers = {
  GET: async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      const ticker = Array.isArray(request.query.ticker)
        ? request.query.ticker[0]
        : request.query.ticker;

      const { queryOptions: requestQueryOptions } = request.query;

      console.log(requestQueryOptions);
      // Validation logic goes here
      if (!ticker) {
        return response.status(400).json({
          message: `Ticker not present`
        });
      }

      // Default query options
      const defaultQueryOptions = {
        period1: "2025-01-01",
        interval: "1d"
      };

      const queryOptions: {
        period1: string;
        period2?: string;
        interval:
          | "1mo"
          | "1m"
          | "2m"
          | "5m"
          | "15m"
          | "30m"
          | "60m"
          | "90m"
          | "1h"
          | "1d"
          | "5d"
          | "1wk"
          | "3mo";
      } = {
        ...defaultQueryOptions,
        ...(requestQueryOptions as unknown as {
          period1: string;
          period2?: string;
          interval:
            | "1mo"
            | "1m"
            | "2m"
            | "5m"
            | "15m"
            | "30m"
            | "60m"
            | "90m"
            | "1h"
            | "1d"
            | "5d"
            | "1wk"
            | "3mo";
        })
      };

      const result = await yahooFinance.chart(ticker, queryOptions);

      console.log(result);
      response.status(200).json(result);
    } catch (err) {
      // Report the error to metrics + logging app
      response.status(500);
    }
    return null;
  },
  POST: async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      const { ticker } = request.body;

      // Validation logic goes here
      if (!ticker) {
        return response.status(400).json({
          message: `Ticker not present`
        });
      }

      const queryOptions: {
        period1: string;
        period2?: string;
        interval:
          | "1mo"
          | "1m"
          | "2m"
          | "5m"
          | "15m"
          | "30m"
          | "60m"
          | "90m"
          | "1h"
          | "1d"
          | "5d"
          | "1wk"
          | "3mo";
      } = { period1: "2025-01-01" /* ... */, interval: "1d" };

      const result = await yahooFinance.chart(ticker, queryOptions);
      response.status(200).json(result);
    } catch (err) {
      // Report the error to metrics + logging app
      response.status(500);
    }
    return null;
  }
};

export default async function yahooFinanceQueryController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
