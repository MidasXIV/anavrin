interface PortfolioItem {
  name: string;
  symbol: string;
  quantity: number;
  costBasis: number;
}

interface Portfolio {
  assetType: AssetType;
  items: Array<PortfolioItem>;
}

interface IUserPortfolioModel {
  getUserPortfolio(email: string): Promise<Array<Portfolio>>;
  updateUserPortfolio(email: string, portfolio: Array<Portfolio>): Promise<ModifyResult<Document>>;
  addUserPortfolioItem(email: string, item: Portfolio): Promise<boolean>;
  deleteUserPortfolioItem(email: string, itemId: string): Promise<boolean>;
}
