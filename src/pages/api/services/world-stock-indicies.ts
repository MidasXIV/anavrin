import { NextApiRequest, NextApiResponse } from "next";
import WorldIndiciesModel from "repositories/WorldIndiciesModel/worldIndiciesModel";
import createHandlers from "../../../lib/rest-utils";
import Result from "../../../lib/result";

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const worldIndiciesModel = new WorldIndiciesModel();
      const result: WorldIndiciesResponse = await worldIndiciesModel.getWorldIndiciesData();

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UnableToParseData":
            res.status(500).json(resultError);
            break;
          case "UnableToFetchData":
            res.status(500).json(resultError);
            break;
          default:
            res.status(500).json(resultError);
            break;
        }
        console.log(resultError);
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
