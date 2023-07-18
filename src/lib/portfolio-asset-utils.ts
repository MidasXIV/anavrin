import { fetchCoinInfo } from "../util/cryptocurrencyService";
import isEmptyDataItem from "../util/type-gaurds";
import { AssetType } from "./portfolio-utils";

/**
 * Converts a CoinGecko API coin object to a simplified DTO understood by CryptoPortfolioSchema
 * in table-schema
 *
 * @param {Object} obj - The CoinGecko API coin object to convert.
 * @returns {Object} A simplified DTO containing the coin's title, symbol, holdings, market price,
 * cost basis, change, and icon source URL.
 */
function convertCoinGeckoApiCoinObjectToDTO(obj: any): CryptoAssetDTO {
  return {
    title: obj?.name,
    token: obj?.token,
    holdings: obj?.holdings,
    marketPrice: obj?.market_data?.current_price.usd,
    marketValue: obj?.market_data?.current_price.usd * obj.holdings, // marketPrice * holdings
    fiat: obj?.fiat,
    change: obj?.market_data?.price_change_percentage_24h,
    iconSrc: obj?.image?.thumb
  };
}

function convertCryptoPortfolioItemToPersistence(obj: CryptoAssetDTO): CryptoPortfolioItem {
  return {
    token: obj.token,
    holdings: obj.holdings,
    fiat: obj.fiat
  };
}

function isCryptoPortfolioItem(item: PortfolioItem): item is CryptoPortfolioItem {
  return (item as CryptoPortfolioItem).token !== undefined;
}

function isStockPortfolioItem(item: PortfolioItem): item is StockPortfolioItem {
  return (item as StockPortfolioItem).ticker !== undefined;
}

const hydrateCryptoPortfolioItems = async (portfolio: Portfolio): Promise<CryptoAssetDTO[]> => {
  if (portfolio.assetType !== AssetType.CRYPTO) {
    throw new Error("InvalidPortfolioItem");
  }

  const { items } = portfolio;
  const data = await Promise.all(
    items.map(async (item: CryptoPortfolioItem) => {
      const tokenInformation = await fetchCoinInfo(item.token);
      const asset = { ...item, ...tokenInformation };
      const cryptoAssetDTO = convertCoinGeckoApiCoinObjectToDTO(asset);
      return cryptoAssetDTO;
    })
  );

  return data;
};

export {
  convertCoinGeckoApiCoinObjectToDTO,
  convertCryptoPortfolioItemToPersistence,
  hydrateCryptoPortfolioItems,
  isCryptoPortfolioItem,
  isStockPortfolioItem
};
