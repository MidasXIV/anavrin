import memoize from "fast-memoize";
import {
  CryptocurrencyExpandableComponent,
  CryptoPortfolioSchema,
  DFMDividendExpandableComponent,
  DFMDividendPortfolioSchema,
  DividendPortfolioSchema,
  onCryptocurrencyTableRowDoublceClick
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
  switch (portfolioType) {
    case AssetType.CRYPTO:
      return CryptocurrencyExpandableComponent;
    case AssetType.DFM:
      return DFMDividendExpandableComponent;
    case AssetType.STOCK:
      return undefined;
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
function getPortfolioSummary(portfolioData: CryptoAssetDTO[]): {
  totalInvested: number;
  portfolioValue: number;
  percentageChange: number;
  ringChartData: {
    value: number;
    color: string;
    tooltip: string;
  }[];
} {
  let totalInvested = 0;
  let portfolioValue = 0;
  portfolioData.forEach(item => {
    totalInvested += item.fiat;
    portfolioValue += item.holdings * item.marketPrice;
  });
  const percentageChange = (portfolioValue / totalInvested - 1) * 100;

  /**
   * Calculates the data for a ring chart based on the portfolio data.
   * Each item in the portfolio data will contribute a portion of the total invested amount to the chart.
   */

  const ringChartData = portfolioData.map(item => ({
    value: (item.fiat / totalInvested) * 100,

    color: generateRandomColor(),

    tooltip: `${item.token} (${((item.fiat / totalInvested) * 100).toFixed(2)}%)`
  }));

  // const formattedTotalInvested = totalInvested.toLocaleString(undefined, {
  //   style: "currency",
  //   currency: "USD",
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2
  // });
  return {
    totalInvested,
    portfolioValue,
    percentageChange,
    ringChartData
  };
}

const getPortfolioSummaryMemoized = memoize(getPortfolioSummary);

export {
  AssetType,
  getPortfolioTableSchema,
  getAddAssetModalTitle,
  getPortfolioExpandableComponent,
  getEditAssetModalTitle,
  getPortfolioRowDoubleClickHandler,
  updatePortfolio,
  getPortfolioSummary,
  getPortfolioSummaryMemoized
};
