import Binance from "binance-api-node";
import { NextApiRequest, NextApiResponse } from "next";

export default class BinanceController {
  client = null;

  constructor() {
    // this.client = Binance();
    const { BINANCE_API_KEY, BINANCE_SECRET } = process.env;
    this.client = Binance({
      apiKey: BINANCE_API_KEY,
      apiSecret: BINANCE_SECRET
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public async getPrices(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const prices = await this.client.prices();
    response.json({
      prices
    });
  }

  public async accountCoins(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const coins = await this.client.accountCoins();
    response.json({
      coins
    });
  }

  public async depositHistory(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const history = await this.client.depositHistory();
    response.json({
      history
    });
  }

  public async historyUSDT(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const history = await this.client.tradesHistory({ symbol: "ETHUSDT" });
    response.json({
      history
    });
  }

  public async getOrders(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const orders = await this.client.allOrders({
      symbol: "ETHUSDT"
    });
    response.json({
      orders
    });
  }

  public async dailyAccountSnapshot(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const snapshot = await this.client.accountSnapshot({
      type: "SPOT"
    });
    response.json({
      snapshot
    });
  }
}
