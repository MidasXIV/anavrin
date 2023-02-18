import {
  CryptoPortfolioSchema,
  DFMDividendPortfolioSchema,
  DividendPortfolioSchema
} from "./table-schema";

enum AssetType {
  STOCK = "stock",
  CRYPTO = "crypto",
  DFM = "dfm"
}

const getPortfolioTableSchema = (portfolioType: AssetType) => {
  switch (portfolioType) {
    case AssetType.CRYPTO:
      return CryptoPortfolioSchema;
    case AssetType.DFM:
      return DFMDividendPortfolioSchema;
    case AssetType.STOCK:
      return DividendPortfolioSchema;
    default:
      return DividendPortfolioSchema;
  }
};

const getAddAssetModalTitle = (portfolioType: AssetType) => {
  const cryptoModalTitle = "Add Cryptocurrency";
  const DFMModalTitle = "Add DFM Stock";
  const stockModalTitle = "Add Stock";
  switch (portfolioType) {
    case AssetType.CRYPTO:
      return cryptoModalTitle;
    case AssetType.DFM:
      return DFMModalTitle;
    case AssetType.STOCK:
      return stockModalTitle;
    default:
      return stockModalTitle;
  }
};

export { AssetType, getPortfolioTableSchema, getAddAssetModalTitle };
