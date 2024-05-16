import {
  backtestExtractUsefulMeta,
  calculateInvestmentGrowth,
  combineBacktestInvestments
} from "lib/backtest-analyze";
import Result from "../../lib/result";

export default class BacktestAnalyze implements IBacktestAnalyze {
  private userModel: IUserModel;

  private dividendInfoScrapper;

  constructor(dividendInfoScrapper: DividendInfoScraper) {
    this.dividendInfoScrapper = dividendInfoScrapper;
  }

  public async execute(data: BacktestAnalyzeData): Promise<BacktestAnalyzeResponse> {
    try {
      const dataframeMapper = new Map();

      console.log(`Request : ${JSON.stringify(data)}`);

      // STEP 2: Fetch Historical Data: Fetch historical stock price data for the benchmark stock and each stock in the portfolio configuration for the specified time period (startYear to endYear).

      const queryOptions: {
        period1: string;
        period2: string;
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
      } = { period1: data.startYear /* ... */, period2: data.endYear, interval: "3mo" };
      const benchMarkChart = await this.dividendInfoScrapper.getHistoricalData(
        data.benchmark,
        queryOptions
      );

      const benchMarkChartData = backtestExtractUsefulMeta(benchMarkChart);
      dataframeMapper.set(benchMarkChartData.symbol, benchMarkChartData);

      const portfolioConfigChartPromises = data.portfolioConfig.map(portfolioConfigItem =>
        this.dividendInfoScrapper.getHistoricalData(portfolioConfigItem.ticker, queryOptions)
      );

      const portfolioChartData = await Promise.allSettled(portfolioConfigChartPromises);

      // Extract useful metadata for each portfolio
      portfolioChartData.forEach(portfolioChartPromise => {
        if (portfolioChartPromise.status === "fulfilled") {
          const portfolioChartDataframe = backtestExtractUsefulMeta(portfolioChartPromise.value);
          dataframeMapper.set(portfolioChartDataframe.symbol, portfolioChartDataframe);
          return;
        }
        console.log("Error in fetching", portfolioChartPromise.reason); // Log the reason for rejection
      });

      // console.log(dataframeMapper);

      // STEP 3: Calculate Portfolio Values
      // Calculate the value of each portfolio at the end of the specified time period

      const benchMarkGrowth = calculateInvestmentGrowth(
        data.initialInvestment,
        dataframeMapper.get(benchMarkChartData.symbol).yearlyAverages
      );

      // Iterate through each portfolio in the portfolioConfig
      const dd: BacktestInvestmentData[][] = data.portfolioConfig.reduce(
        (acc, portfolioConfigItem) => {
          const yearlyAverages = dataframeMapper.get(portfolioConfigItem.ticker);

          const investmentPerPortfolio = portfolioConfigItem.portfolioDistribution.map(
            portfolioDistributionData => {
              const initialInvestment =
                (data.initialInvestment * portfolioDistributionData.distribution) / 100;
              return calculateInvestmentGrowth(initialInvestment, yearlyAverages.yearlyAverages);
            }
          );
          // console.log(investmentPerPortfolio);

          // Merge acc + investmentPerPortfolio
          const combinedResult = investmentPerPortfolio.map((subArray1, index) => {
            const subArray2 = acc?.[index];
            return combineBacktestInvestments(subArray1, subArray2);
          });

          return combinedResult;
        },
        []
      );

      console.log(dd);
      // STEP 4: Calculate Benchmark Growth
      // Calculate the growth of the benchmark stock over the specified time period

      // STEP 5: Plot Results
      // Plot the growth of each portfolio against the growth of the benchmark stock to visualize the performance comparison

      // STEP 6: Analyze Results
      // Analyze the plotted results to determine how each portfolio performed compared to the benchmark stock

      // Return Empty Array or the subscriptions.
      return Result.ok({
        benchMarkGrowth,
        portfoliosGrowth: dd
      });
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "InternalServerError" });
    }
  }
}
