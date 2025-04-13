import isEmptyDataItem from "@/utils/type-gaurds";
import { ChartResultArray } from "yahoo-finance2/dist/esm/src/modules/chart";
import { generateRandomColor } from "./tremor-color";

export function backtestCoerceData(data: BacktestHistoricalData[]): BacktestYearlyAverage[] {
  const groupedByYear: { [year: number]: BacktestHistoricalData[] } = {};
  data.forEach(item => {
    const year = item.date.getFullYear();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(item);
  });

  const yearlyAverages: BacktestYearlyAverage[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const year in groupedByYear) {
    if (Object.prototype.hasOwnProperty.call(groupedByYear, year)) {
      const yearData = groupedByYear[year];
      const totalClose = yearData.reduce((sum, item) => sum + item.close, 0);
      const averageClose = totalClose / yearData.length;
      yearlyAverages.push({ year: parseInt(year, 10), averageClose });
    }
  }

  return yearlyAverages;
}

export function backtestExtractUsefulMeta(data: ChartResultArray): BacktestMetaData {
  const { meta, quotes } = data;
  const yearlyAverages = backtestCoerceData(quotes);
  return {
    currency: meta.currency || "",
    symbol: meta.symbol || "",
    exchangeName: meta.exchangeName || "",
    regularMarketPrice: meta.regularMarketPrice || 0,
    fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh || 0,
    fiftyTwoWeekLow: meta.fiftyTwoWeekLow || 0,
    chartPreviousClose: meta.chartPreviousClose || 0,
    yearlyAverages
  };
}

export function calculateInvestmentGrowth(
  initialInvestment: number,
  yearlyAverages: BacktestYearlyAverage[]
): InvestmentData[] {
  const investmentGrowth = [];
  let currentInvestment = initialInvestment;

  yearlyAverages.forEach((yearlyAverage, index) => {
    // Calculate the investment for the current year based on the growth rate
    const growthRate =
      index === 0 ? 1 : yearlyAverage.averageClose / yearlyAverages[index - 1].averageClose;
    currentInvestment *= growthRate;

    // Add the investment for the current year to the investmentGrowth array
    investmentGrowth.push({ year: yearlyAverage.year, investment: currentInvestment });
  });

  return investmentGrowth;
}

export function combineBacktestInvestments(
  investments1: BacktestInvestmentData[],
  investments2: BacktestInvestmentData[]
): BacktestInvestmentData[] {
  const combinedInvestments: BacktestInvestmentData[] = [];

  // Iterate through the years of both arrays
  let i = 0;
  let j = 0;
  if (isEmptyDataItem(investments1) || investments1?.length < 1) {
    return investments2;
  }
  if (isEmptyDataItem(investments2) || investments2?.length < 1) {
    return investments1;
  }

  while (i < investments1.length || j < investments2.length) {
    const year1 = i < investments1.length ? investments1[i].year : Number.MAX_SAFE_INTEGER;
    const year2 = j < investments2.length ? investments2[j].year : Number.MAX_SAFE_INTEGER;

    // Combine investments for the current year
    if (year1 === year2) {
      combinedInvestments.push({
        year: year1,
        investment: investments1[i].investment + investments2[j].investment
      });
      i += 1;
      j += 1;
    } else if (year1 < year2) {
      // If year exists in the first array but not in the second,
      // add the investment from the first array + initial investment of the second array
      combinedInvestments.push({
        year: year1,
        investment: investments1[i].investment + investments2[0]?.investment ?? 0
      });
      i += 1;
    } else {
      // If year exists in the second array but not in the first, add the investment from the second array
      combinedInvestments.push({
        year: year2,
        investment: investments2[j].investment + investments1[0]?.investment ?? 0
      });
      j += 1;
    }
  }

  return combinedInvestments;
}

export function convertToCombinedFormat(
  investments: InvestmentData[][],
  benchmark: InvestmentData[]
): CombinedInvestment[] {
  // Extract years from the first array
  const years = investments[0].map(data => data.year);

  // Initialize the combined result array
  const combinedResult: CombinedInvestment[] = [];

  // Iterate over each year and combine investments from all portfolios
  years.forEach(year => {
    // Create a new CombinedInvestment object for the current year
    const combinedData = {
      timeFrame: year.toString(),
      benchmark: benchmark.find(data => data.year === year)?.investment ?? 0
    } as CombinedInvestment;

    // Add investments from each portfolio to the combined data
    investments.forEach((portfolio, index) => {
      const investment = portfolio.find(data => data.year === year);
      combinedData[`portfolio${index + 1}`] = investment ? investment.investment : 0;
    });

    // Add the combined data to the result array
    combinedResult.push(combinedData);
  });

  return combinedResult;
}
export function convertToCombinedFormat2(
  investments: InvestmentData[][],
  benchmark: InvestmentData[]
): Array<{ time: string; value: number; ticker: string }> {
  const combinedResult = [];

  investments.forEach((investment, index) => {
    combinedResult.push(
      investment.map(a => ({
        ticker: `portfolio${index + 1}`,
        time: `${a.year}-01-01`,
        value: a.investment
      }))
    );
  });
  combinedResult.push(
    benchmark.map(a => ({
      ticker: "benchmark",
      time: `${a.year}-01-01`,
      value: a.investment
    }))
  );
  return combinedResult;
}

export function convertPortfolioConfigToPortfolios(backtestConfig: BacktestAnalyzeData): {
  value: number;
  composition: string;
  color: string;
  tooltip: string;
}[][] {
  const { initialInvestment, portfolioConfig } = backtestConfig;
  const numberOfPortfolios = portfolioConfig[0].portfolioDistribution.length;
  const portfolios = new Array(numberOfPortfolios).fill(0).map((_, index) =>
    portfolioConfig.map(configItem => {
      const { ticker, portfolioDistribution } = configItem;
      return {
        tooltip: ticker,
        color: generateRandomColor(),
        composition: portfolioDistribution[index].distribution.toString(),
        value: initialInvestment * (portfolioDistribution[index].distribution / 100)
      };
    })
  );

  return portfolios;
}

function calculateMean(values: number[]): number {
  return values.reduce((acc, current) => acc + current, 0) / values.length;
}

function calculateCagr(years: number[], values: number[]): number {
  const cagr =
    Math.pow(values[values.length - 1] / values[0], 1 / (years[years.length - 1] - years[0])) - 1;
  return cagr * 100;
}

function calculateStdev(values: number[]): number {
  const mean = calculateMean(values);
  const variance =
    values.reduce((acc, current) => acc + Math.pow(current - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function calculateBestYearPercentageIncrease(values: number[]): number {
  let maxIncrease = 0;
  for (let i = 1; i < values.length; i++) {
    const increase = (values[i] / values[i - 1] - 1) * 100;
    if (increase > maxIncrease) {
      maxIncrease = increase;
    }
  }
  return maxIncrease;
}

function calculateWorstYearPercentageDecrease(values: number[]): number {
  let maxDecrease = 0;
  for (let i = 1; i < values.length; i++) {
    const decrease = (values[i - 1] / values[i] - 1) * 100;
    if (decrease > maxDecrease) {
      maxDecrease = decrease;
    }
  }
  return maxDecrease;
}

function calculateMaxDrawdown(values: number[]): number {
  let maxDrawdown = 0;
  let peak = values[0];
  let trough = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > peak) {
      peak = values[i];
    } else if (values[i] < trough) {
      trough = values[i];
      const drawdown = ((peak - trough) / peak) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
  }
  return maxDrawdown;
}

function calculateSharpeRatio(values: number[]): number {
  const mean = calculateMean(values);
  const stdev = calculateStdev(values);
  return (mean - 0) / stdev;
}

function calculateSortinoRatio(values: number[]): number {
  const mean = calculateMean(values);
  const stdev = calculateStdev(values);
  return (mean - 0) / stdev;
}

function calculateMarketCorrelation(years: number[], values: number[]): number {
  // TO DO: implement market correlation calculation
  return 0;
}

export function calculatePortfolioMetrics(portfolio: BacktestInvestmentData[]): {
  initialBalance: number;
  finalBalance: number;
  cagr: number;
  stdev: number;
  bestYearPercentageIncrease: number;
  worstYearPercentageDecrease: number;
  maxDrawdown: number;
  sharpeRatio: number;
  sortinoRatio: number;
  marketCorrelation: number;
} {
  const years = portfolio.map(item => item.year);
  const values = portfolio.map(item => item.investment);

  const initialBalance = values[0];
  const finalBalance = values[values.length - 1];
  const cagr = calculateCagr(years, values);
  const stdev = calculateStdev(values);
  const bestYearPercentageIncrease = calculateBestYearPercentageIncrease(values);
  const worstYearPercentageDecrease = calculateWorstYearPercentageDecrease(values);
  const maxDrawdown = calculateMaxDrawdown(values);
  const sharpeRatio = calculateSharpeRatio(values);
  const sortinoRatio = calculateSortinoRatio(values);
  const marketCorrelation = calculateMarketCorrelation(years, values);

  return {
    initialBalance,
    finalBalance,
    cagr,
    stdev,
    bestYearPercentageIncrease,
    worstYearPercentageDecrease,
    maxDrawdown,
    sharpeRatio,
    sortinoRatio,
    marketCorrelation
  };
}
