import makeRequest from "../../util/makeRequest";

export default class CoinGeckoModel {
  constructor() {}

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
      return [];
    }
    const { data } = response;
    return data;
  }
}
