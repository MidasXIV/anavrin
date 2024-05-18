interface BacktestAnalyzeData {
  benchmark: string;
  initialInvestment: number;
  startYear: string;
  endYear: string;
  portfolioConfig: Array<{
    ticker: string;
    portfolioDistribution: Array<{ distribution: number }>;
  }>;
}

interface BacktestHistoricalData {
  date: Date;
  close: number;
}

interface BacktestYearlyAverage {
  year: number;
  averageClose: number;
}

interface BacktestMetaData {
  currency: string;
  symbol: string;
  exchangeName: string;
  regularMarketPrice: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  chartPreviousClose: number;
  yearlyAverages: BacktestYearlyAverage[];
}

interface BacktestInvestmentData {
  year: number;
  investment: number;
}

interface InvestmentData {
  year: number;
  investment: number;
}

interface CombinedInvestment {
  timeFrame: string;
  benchmark: number;
  [key: string]: number; // Dynamic key for portfolios
}

interface BacktestAnalyzeDTO {
  request: BacktestAnalyzeData;
  benchMarkGrowth: InvestmentData[];
  portfoliosGrowth: BacktestInvestmentData[][];
}

type BacktestAnalyzeResponse = Either<UserNotLoggedIn | InternalServerError, BacktestAnalyzeDTO>;

interface IBacktestAnalyze {
  execute(data: BacktestAnalyzeData): Promise<BacktestAnalyzeResponse>;
}
