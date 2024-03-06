/* eslint-disable camelcase */
import makeRequest from "../../utils/makeRequest";

export default class CoinGeckoModel {
  constructor() {}

  // TODO: Move it to API
  private calcScore(coinInfo) {
    let score = 0;
    const price_change_24h_weight = 0.3;
    const price_change_7d_weight = 0.2;
    const price_change_14d_weight = 0.1;
    const market_cap_weight = 0.2;
    const trading_volume_weight = 0.2;

    score += coinInfo.market_data.price_change_percentage_24h * price_change_24h_weight;
    score += coinInfo.market_data.price_change_percentage_7d * price_change_7d_weight;
    score += coinInfo.market_data.price_change_percentage_14d * price_change_14d_weight;
    score += Math.log10(coinInfo.market_data.market_cap.usd) * market_cap_weight;
    score += Math.log10(coinInfo.market_data.total_volume.usd) * trading_volume_weight;
    return score;
  }

  public async getCoinList(): Promise<
    Array<{
      id: string;
      symbol: string;
      name: string;
    }>
  > {
    const coinGeckoCoinListEndpoint = "https://api.coingecko.com/api/v3/coins/list";
    const response = await makeRequest(coinGeckoCoinListEndpoint);
    if (response.status !== 200) {
      return [];
    }
    const { data } = response;
    return data;
  }

  public async getCoinInfo(coinId: string): Promise<any> {
    const coinGeckoCoinInfoEndpoint = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const response = await makeRequest(coinGeckoCoinInfoEndpoint);
    if (response.status !== 200) {
      return undefined;
    }
    const { data } = response;
    data.anavrin_score = this.calcScore(data);
    return data;
  }
}
