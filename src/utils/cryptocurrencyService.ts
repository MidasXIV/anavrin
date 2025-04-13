import api from "services/create-service";
import findCoinGeckoAssetBySymbol from "lib/crypto-icons-fuzzy-search";
import CoinGeckoModel from "../repositories/CoinGeckoModel/coinGeckoModel";

const fetchCoinList = async () => {
  const coinGeckoModel = new CoinGeckoModel();

  return coinGeckoModel.getCoinList();
};

const fetchCoinInfo = async (coinId: string) => {
  // const coinGeckoModel = new CoinGeckoModel();

  // return coinGeckoModel.getCoinInfo(coinId);

  const queryOptions: YahooFinanceQueryOptions = {
    period1: "2025-01-01",
    interval: "1d",
    return: "object"
  };

  const { data } = await api.yahooFinanceQuery({ ticker: coinId, queryOptions });
  const asset = await findCoinGeckoAssetBySymbol(coinId);
  data.coinGeckoAsset = asset;

  return data;
};

export { fetchCoinList, fetchCoinInfo };
