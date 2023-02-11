import {
  CryptoPortfolioSchema,
  DFMDividendPortfolioSchema,
  DividendPortfolioSchema
} from "./table-schema";

enum PortfolioType {
  STOCK = "stock",
  CRYPTO = "crypto",
  DFM = "dfm"
}

const getPortfolioTableSchema = (portfolioType: PortfolioType) => {
  switch (portfolioType) {
    case PortfolioType.CRYPTO:
      return CryptoPortfolioSchema;
    case PortfolioType.DFM:
      return DFMDividendPortfolioSchema;
    case PortfolioType.STOCK:
      return DividendPortfolioSchema;
    default:
      return DividendPortfolioSchema;
  }
};

export { PortfolioType, getPortfolioTableSchema };
