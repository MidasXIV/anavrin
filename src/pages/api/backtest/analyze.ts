import { NextApiRequest, NextApiResponse } from "next";
import { BacktestAnalyze, CreateBacktestAnalyzeController } from "controllers/backtestAnalyze";
import YahooFinanceRepo from "../../../repositories/YahooFinanceModel/yahooFinanceModel";
import createHandlers from "../../../lib/rest-utils";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const yahooFinanceRepo = new YahooFinanceRepo();
      const backtestAnalyze = new BacktestAnalyze(yahooFinanceRepo);
      const backtestAnalyzeController = new CreateBacktestAnalyzeController(backtestAnalyze);

      await backtestAnalyzeController.execute(req, res);
    } catch (err) {
      // Report the error to metrics + logging app
      res.status(500);
    }
  }
};

export default async function BacktestAnalyzeController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
