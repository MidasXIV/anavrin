interface CryptoAssetDTO {
  title: string;
  token: string;
  holdings: number;
  marketPrice: number;
  marketValue: number; // marketPrice * holdings
  fiat: number;
  change: number;
  iconSrc: string;
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
