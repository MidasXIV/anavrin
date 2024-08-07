/* eslint-disable camelcase */
interface LinksData {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: string | null;
  telegram_channel_identifier: string;
  subreddit_url: string | null;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

interface CryptoAssetDTO {
  title: string;
  token: string;
  holdings: number;
  marketPrice: number;
  marketValue: number; // marketPrice * holdings
  fiat: number;
  change: number;
  iconSrc: string;
  categories: Array<string>;
  links: LinksData;
}

interface DividendAssetDTO {
  title: string;
  symbol: string;
  sector: string;
  shares: number;
  avgPrice: string;
  marketPrice: number;
  costBasis: number;
  marketValue: number;
  netValue: string;
  earningPerShare: string;
  pricePerEarning: string;
  dividendAmount: string;
  dividendYield: string;
  yieldOnCost: number;
  income: number;
  beta: string;
  exchange: string;
  marketCap: string;
  AnnualDividends: Record<string, number>;
  AnnualDividendGrowth: Record<
    string,
    {
      dividend: number;
      growth: number;
    }
  >;
}

interface StockPortfolioItem {
  ticker: string;
  shares: number;
  fiat: number;
}

interface CryptoPortfolioItem {
  token: string;
  holdings: number;
  fiat: number;
}

type PortfolioItem = StockPortfolioItem | CryptoPortfolioItem;

interface Portfolio {
  _id?: ObjectId;
  assetType: AssetType;
  items: Array<PortfolioItem>;
}

interface IUserPortfolioModel {
  getUserPortfolio(email: string): Promise<Array<Portfolio>>;
  updateUserPortfolio(
    email: string,
    portfolio: Portfolio
  ): Promise<{
    value: Portfolio;
    ok: boolean;
  }>;
  addUserPortfolioItem(
    email: string,
    item: Portfolio
  ): Promise<UpdateResult & { value: Portfolio; ok: boolean }>;
  deleteUserPortfolioItem(email: string, itemId: string): Promise<UpdateResult & { ok: boolean }>;
}

interface TradingPeriod {
  timezone: string;
  end: string;
  start: string;
  gmtoffset: number;
}

interface CurrentTradingPeriod {
  pre: TradingPeriod;
  regular: TradingPeriod;
  post: TradingPeriod;
}

interface Meta {
  currency: string;
  symbol: string;
  exchangeName: string;
  fullExchangeName: string;
  instrumentType: string;
  firstTradeDate: string;
  regularMarketTime: string;
  hasPrePostMarketData: boolean;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  chartPreviousClose: number;
  priceHint: number;
  currentTradingPeriod: CurrentTradingPeriod;
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

interface Quote {
  date: string;
  high: number;
  volume: number;
  open: number;
  low: number;
  close: number;
  adjclose: number;
}

interface CryptoAssetDTOV2 {
  token: string;
  holdings: number;
  fiat: number;
  meta: Meta;
  quotes: Quote[];
}

interface YahooFinanceQueryOptions {
  period1: string;
  period2?: string;
  interval:
    | "1mo"
    | "1m"
    | "2m"
    | "5m"
    | "15m"
    | "30m"
    | "60m"
    | "90m"
    | "1h"
    | "1d"
    | "5d"
    | "1wk"
    | "3mo";
  return: "object";
}
interface CrptoPortfolioValue {
  meta: {
    portfolioItems: {
      token: string;
      holdings: number;
      fiat: number;
    }[];
  };
  quotes: {
    date: string;
    value: number;
    meta: {
      item: string;
      value: number;
    }[];
  }[];
}
