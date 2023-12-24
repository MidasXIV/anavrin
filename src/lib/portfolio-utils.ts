import memoize from "fast-memoize";
import { formatNumber } from "@/utils/helper";
import {
  CryptocurrencyExpandableComponent,
  CryptoPortfolioSchema,
  DFMDividendExpandableComponent,
  DFMDividendPortfolioSchema,
  DividendPortfolioSchema,
  onCryptocurrencyTableRowDoublceClick,
  onDividendTableRowDoublceClick,
  StocksDividendExpandableComponent
} from "./table-schema";

const AssetType = {
  STOCK: "stock",
  CRYPTO: "crypto",
  DFM: "dfm"
} as const;

type AssetType = (typeof AssetType)[keyof typeof AssetType];

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

const getPortfolioExpandableComponent = (portfolioType: AssetType) => {
  console.log(portfolioType);
  switch (portfolioType) {
    case AssetType.CRYPTO:
      return CryptocurrencyExpandableComponent;
    case AssetType.DFM:
      return DFMDividendExpandableComponent;
    case AssetType.STOCK:
      return StocksDividendExpandableComponent;
    default:
      return undefined;
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

const getEditAssetModalTitle = (portfolioType: AssetType) => {
  const cryptoModalTitle = "Edit Cryptocurrency Holding Info";
  const DFMModalTitle = "Edit DFM Stock Shares Info";
  const stockModalTitle = "Edit Stock Shares Info";
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

/**
 * Returns a row double click handler function based on the given portfolio type
 * and also pass parent props. Parent props are mainly passed to give context to
 * double click handler. (example to access data and useState setters )
 *
 * @param {AssetType} portfolioType - The type of asset portfolio.
 * @param {any} parentProps - The props of the parent component.
 * @returns {(row: any, event: any) => void} - The row double click handler function.
 */
const getPortfolioRowDoubleClickHandler = (
  portfolioType: AssetType,
  parentProps
): ((row: any, event: any) => void) => {
  // Create a map of portfolio type to corresponding row double click handler functions.
  const portfolioRowDBClickHandlerMapper = new Map<
    AssetType,
    (parentComponentProps: any) => (row: any, event: any) => void
  >();

  portfolioRowDBClickHandlerMapper.set(AssetType.STOCK, onDividendTableRowDoublceClick);
  portfolioRowDBClickHandlerMapper.set(AssetType.CRYPTO, onCryptocurrencyTableRowDoublceClick);

  // Get the row double click handler function for the given portfolio type from the mapper,
  // and call it with the parent props as argument.
  return portfolioRowDBClickHandlerMapper.get(portfolioType)(parentProps);
};

/**
 * Updates an object in an array with a matching key/value pair, or returns
 * the original array if the object is not found.
 *
 * @param originalArray The original array of objects to be updated.
 * @param updatedObject The object with updated properties.
 * @param key The key used to match objects in the original array.
 * @returns The updated array of objects.
 */
const updatePortfolio = <T extends { [key: string]: any }>(
  originalArray: T[],
  updatedObject: T,
  key: string
): T[] => {
  const indexToUpdate = originalArray.findIndex(obj => obj[key] === updatedObject[key]);

  if (indexToUpdate !== -1) {
    const newArray = [...originalArray];
    newArray[indexToUpdate] = updatedObject;
    return newArray;
  }
  // Return the original array if the object is not found.
  return originalArray;
};

/**
 * Generates a random hex color code.
 *
 * @returns {string} - The randomly generated color code.
 */
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Calculates the total invested amount and portfolio value for a given portfolioData array
 *
 * @param {Array} portfolioData - Array of portfolio data objects
 * @returns {Object} - Object containing total invested amount and portfolio value
 */
function getPortfolioSummary(
  portfolioData: CryptoAssetDTO[] | DividendAssetDTO[],
  portfolioType: AssetType
): {
  totalInvested: number;
  portfolioValue: number;
  percentageChange: number;
  ringChartData: {
    value: number;
    color: string;
    tooltip: string;
  }[];
  dividendIncome?: number;
  portfolioDividendYield?: number;
  portfolioDividendEfficiency?: number;
} {
  let totalInvested = 0;
  let portfolioValue = 0;
  let dividendIncome = 0;
  let portfolioDividendYield = 0;
  let portfolioDividendEfficiency = 0;
  /**
   * Calculates the data for a ring chart based on the portfolio data.
   * Each item in the portfolio data will contribute a portion of the total
   * invested amount to the chart.
   */

  let ringChartData = [];

  switch (portfolioType) {
    case AssetType.CRYPTO:
      portfolioData.forEach(item => {
        totalInvested += item.fiat;
        portfolioValue += item.holdings * item?.marketPrice;
      });
      ringChartData = portfolioData
        .map(item => ({
          value: item.fiat,
          composition: ((item.fiat / totalInvested) * 100).toFixed(1),

          color: generateRandomColor(),

          // tooltip: `${item.token} (${((item.fiat / totalInvested) * 100).toFixed(2)}%)`
          tooltip: `${item.token}`
        }))
        .sort((a, b) => b.value - a.value);
      break;
    case AssetType.STOCK:
      portfolioData.forEach(item => {
        totalInvested += item.costBasis;
        portfolioValue += item.shares * item?.marketPrice;
        dividendIncome += Number.parseFloat(item.income ?? 0);
      });
      ringChartData = portfolioData
        .map(item => ({
          value: item.costBasis,
          composition: ((item.costBasis / totalInvested) * 100).toFixed(1),
          color: generateRandomColor(),
          tooltip: `${item.symbol}`
          // tooltip: `${item.symbol} (${((item.costBasis / totalInvested) * 100).toFixed(2)}%)`
        }))
        .sort((a, b) => b.value - a.value);

      /**
       * Portfolio Dividend Yield=( Total Annual Dividends / Total Portfolio Value  )×100
       */
      portfolioDividendYield = parseFloat(((dividendIncome / portfolioValue) * 100).toFixed(2));

      /**
       * "Dividend Efficiency" or "Dividend Yield on Investment
       * =( Total Annual Dividends / Total Fiat Value  )×100
       */

      portfolioDividendEfficiency = parseFloat(((dividendIncome / totalInvested) * 100).toFixed(2));
      break;
    default:
      break;
  }

  const percentageChange = (portfolioValue / totalInvested - 1) * 100;

  return {
    totalInvested,
    portfolioValue,
    percentageChange,
    ringChartData,
    dividendIncome,
    portfolioDividendYield,
    portfolioDividendEfficiency
  };
}

/**
 * Calculate ring chart data for portfolio diversification.
 * @param {Object[]} portfolioData - Array of portfolio objects.
 * @param {string} portfolioData._id - The portfolio ID.
 * @param {string} portfolioData.assetType - The type of asset in the portfolio.
 * @param {Object[]} portfolioData.items - Array of items in the portfolio.
 * @param {string} portfolioData.items.token - The token symbol.
 * @param {number} portfolioData.items.holdings - The amount of holdings for the token.
 * @param {number} portfolioData.items.fiat - The value in fiat currency for the token.
 * @returns {Object[]} - Array of ring chart data objects.
 * @property {number} value - The percentage value of the portfolio in the total investment.
 * @property {string} color - The color for the ring chart segment.
 * @property {string} tooltip - The tooltip text for the ring chart segment.
 */
const getPortfolioDiversificationChartData = memoize((portfolios: Portfolio[]) => {
  // Calculate the total investment across all portfolios
  const totalInvestment = portfolios.reduce((acc, portfolio) => {
    const portfolioTotalInvestment = portfolio.items.reduce((sum, item) => sum + item.fiat, 0);
    return acc + portfolioTotalInvestment;
  }, 0);

  // Generate ring chart data based on portfolio information
  const ringChartData = portfolios.map(portfolio => {
    const portfolioTotalInvestment = portfolio.items.reduce((sum, item) => sum + item.fiat, 0);
    const value = portfolioTotalInvestment;
    const diversificationPercentage = Number.parseFloat(
      ((portfolioTotalInvestment / totalInvestment) * 100).toFixed(2)
    );
    const tooltip = `${portfolio._id}`;

    return {
      value,
      diversificationPercentage,
      color: generateRandomColor(),
      tooltip
    };
  });

  return ringChartData;
});

const getPortfolioSummaryMemoized = memoize(getPortfolioSummary);

const formatPortfolioId = portfolioId =>
  // last 6 characters
  portfolioId.slice(-6);

export {
  AssetType,
  getPortfolioTableSchema,
  getAddAssetModalTitle,
  getPortfolioExpandableComponent,
  getEditAssetModalTitle,
  getPortfolioRowDoubleClickHandler,
  updatePortfolio,
  getPortfolioSummary,
  getPortfolioSummaryMemoized,
  getPortfolioDiversificationChartData,
  formatPortfolioId
};
