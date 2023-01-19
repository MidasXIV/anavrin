import CoinGeckoModel from "../repositories/CoinGeckoModel/coinGeckoModel";

const fetchCoinList = async () => {
  const coinGeckoModel = new CoinGeckoModel();

  return coinGeckoModel.getCoinList();
};

const fetchCoinInfo = async (coinId: string) => {
  const coinGeckoModel = new CoinGeckoModel();

  return coinGeckoModel.getCoinInfo(coinId);
};

export { fetchCoinList, fetchCoinInfo };
