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
