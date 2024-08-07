import { formatNumber } from "@/utils/helper";
import { fetchCoinInfo } from "../utils/cryptocurrencyService";
import getStockInformation from "../utils/getStockInformation";
import isEmptyDataItem from "../utils/type-gaurds";
import { AssetType } from "./portfolio-utils";
import rateLimit from "./rate-limiting";
import MockCryptoPortfolio from "../tests/mocks/mock-crypto-portfolio-1";
import MockDividendPortfolio from "../tests/mocks/mock-dividend-portfolio-1";
import api from "services/create-service";

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
    iconSrc: obj?.image?.thumb,
    categories: obj.categories,
    links: obj.links
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
  // const data = await Promise.all(
  //   items.map(
  //     rateLimit(async (item: CryptoPortfolioItem) => {
  //       const tokenInformation = await fetchCoinInfo(item.token);
  //       const asset = { ...item, ...tokenInformation };
  //       const cryptoAssetDTO = convertCoinGeckoApiCoinObjectToDTO(asset);
  //       return cryptoAssetDTO;
  //     }, 5)
  //   )
  // );

  const data = MockCryptoPortfolio as any as CryptoAssetDTO[];
  return data;
};

const hydrateCryptoPortfolioItemsV2 = async (portfolio: Portfolio): Promise<CryptoAssetDTOV2[]> => {
  if (portfolio.assetType !== AssetType.CRYPTO) {
    throw new Error("InvalidPortfolioItem");
  }

  const { items } = portfolio as { items : CryptoPortfolioItem[] };
  const queryOptions: YahooFinanceQueryOptions  = { period1: "2024-01-01", interval: "1d", return: "object" };

  const portfolioConfigChartPromises = items.map((item: CryptoPortfolioItem) =>
    api.yahooFinanceQuery({ ticker: item.token, queryOptions })
  );

  const datav2 = await Promise.allSettled(portfolioConfigChartPromises);

  // Process settled promises and combine data
  const combinedData = datav2.map((result, index) => {
    if (result.status === "fulfilled") {
      const {
        data: { meta, quotes }
      } = result.value;
      return { ...items[index], meta, quotes };
    } else {
      console.error(
        `Failed to fetch data for ${(items[index] as CryptoPortfolioItem).token}:`,
        result.reason
      );
      return { ...items[index], meta: null, quotes: null };
    }
  });

  // console.log(combinedData);

  // const data = MockCryptoPortfolio as any as CryptoAssetDTO[];
  // return data;

  return combinedData;
};


const calculateCrptoPortfolioValue = (portfolioItems: CryptoAssetDTOV2[]): CrptoPortfolioValue => {
  const meta = {
    portfolioItems: portfolioItems.map(item => ({
      token: item.token,
      holdings: item.holdings,
      fiat: item.fiat
    }))
  };

  const quotesMap: { [date: string]: { totalValue: number; breakdown: { item: string; value: number }[] } } = {};

  portfolioItems.forEach(item => {
    item.quotes.forEach(quote => {
      const date = quote.date.split('T')[0]; // Extract the date part, ignoring the time
      const value = quote.close * item.holdings;
      if (quotesMap[date]) {
        quotesMap[date].totalValue += value;
        quotesMap[date].breakdown.push({ item: item.token, value });
      } else {
        quotesMap[date] = {
          totalValue: value,
          breakdown: [{ item: item.token, value }]
        };
      }
    });
  });

  const quotes = Object.keys(quotesMap).map(date => ({
    date,
    value: quotesMap[date].totalValue,
    meta: quotesMap[date].breakdown
  }));

  return { meta, quotes };
};

// FIXME: why are numeric values being passed as strings
function convertDividendDataToDTO(data: any): DividendAssetDTO {
  const {
    name: title,
    ticker: symbol,
    sector,
    shares,
    price: marketPrice,
    dividendAmount,
    dividendYield,
    EPS: earningPerShare,
    peRatio: pricePerEarning,
    beta,
    exchange,
    marketCap,
    fiat: costBasis,
    AnnualDividends,
    AnnualDividendGrowth
  } = data;

  // Calculate other properties based on the data
  const marketValue = formatNumber(marketPrice * shares, 2);
  const netValue = "";
  const income = formatNumber(dividendAmount * shares, 2);
  // YOC=( Annual Dividend Amount / Cost Basis )×100
  const yieldOnCost = formatNumber((income / costBasis) * 100, 2);
  const avgPrice = (costBasis / shares).toFixed(2);

  return {
    title,
    symbol,
    sector,
    shares,
    avgPrice,
    marketPrice: formatNumber(marketPrice, 2),
    costBasis,
    marketValue,
    netValue,
    earningPerShare,
    pricePerEarning,
    dividendAmount: dividendAmount.toFixed(2),
    dividendYield,
    yieldOnCost,
    income,
    beta,
    exchange,
    marketCap,
    AnnualDividends,
    AnnualDividendGrowth
  };
}

function convertDividendPortfolioItemToPersistence(obj: DividendAssetDTO): StockPortfolioItem {
  return {
    ticker: obj.symbol,
    shares: obj.shares,
    fiat: obj.costBasis
  };
}

const hydrateDividendPortfolioItems = async (portfolio: Portfolio): Promise<unknown[]> => {
  if (portfolio.assetType !== AssetType.STOCK) {
    throw new Error("InvalidPortfolioItem");
  }

  const { items } = portfolio;
  console.log("hydrating dividend info");

  const data = MockDividendPortfolio;
  // const data = await Promise.all(
  //   items.map(
  //     rateLimit(async (item: StockPortfolioItem) => {
  //       const stockInformationData = await getStockInformation(item.ticker);
  //       if (stockInformationData.status !== 200) {
  //         console.error(`Unable to get information for ticker ${item.ticker}`);
  //         return item;
  //       }
  //       const { data: stockInformation } = stockInformationData;
  //       const asset = { ...item, ...stockInformation };
  //       const dividendAssetDTO = convertDividendDataToDTO(asset);
  //       return dividendAssetDTO;
  //     }, 3)
  //   )
  // );
  return data;
};

/**
 * Whenever a new portfolio type is created, we need to add the following functions
 * 1. ToDTO  ( What gets used by the app )
 * 2. ToPersistence ( what gets saved to DB )
 * 3. Hydrating fn ( converts to persistence to DTO )
 * 4. Typegaurd
 */

export {
  isCryptoPortfolioItem,
  isStockPortfolioItem,
  convertCoinGeckoApiCoinObjectToDTO,
  convertCryptoPortfolioItemToPersistence,
  hydrateCryptoPortfolioItems,
  hydrateCryptoPortfolioItemsV2,
  convertDividendPortfolioItemToPersistence,
  hydrateDividendPortfolioItems,
  convertDividendDataToDTO,
  calculateCrptoPortfolioValue
};
