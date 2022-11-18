import { NextApiRequest, NextApiResponse } from "next";
import YahooFinanceRepo from "../../repositories/YahooFinanceModel/yahooFinanceModel";
import { DividendInfo, CreateDividendInfoController } from "../../controllers/dividendInfo";
import createHandlers from "../../lib/rest-utils";

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const yahooFinanceRepo = new YahooFinanceRepo();
    const dividendInfo = new DividendInfo(yahooFinanceRepo);
    const createDividendInfoController = new CreateDividendInfoController(dividendInfo);

    await createDividendInfoController.execute(req, res);
  }
};

export default async function DividendController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
