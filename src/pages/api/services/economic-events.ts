import { NextApiRequest, NextApiResponse } from "next";
import createHandlers from "../../../lib/rest-utils";
import Result from "../../../lib/result";
import FinvizEconomicCalendarModel from "../../../repositories/FinvizEconomicCalendarModel/finvizEconomicCalendarModel";

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const finvizEconomicCalendarModel = new FinvizEconomicCalendarModel();
      const result: EcnomicEventsResponse = await finvizEconomicCalendarModel.getEcnomicEvents();

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UnableToParseData":
            res.status(500).json(result);
            break;
          case "UnableToFetchData":
            res.status(500).json(result);
            break;
          default:
            res.status(500).json(result);
            break;
        }
      }

      const resultSuccess = Result.getValue(result);
      res.status(200).json(resultSuccess);
    } catch (err) {
      // Report the error to metrics + logging app
      res.status(500);
    }
  }
};

export default async function EconomicEventsController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
