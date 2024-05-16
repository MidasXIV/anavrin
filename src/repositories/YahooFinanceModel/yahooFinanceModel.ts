/**
 * Handles Fetching and parseing of data from Yahoo Finance
 */
import axios from "axios";
import yahooFinance from "yahoo-finance2";
import { ChartOptionsWithReturnObject } from "yahoo-finance2/dist/esm/src/modules/chart";

class YahooFinanceModel implements DividendInfoScraper {
  nameQuerySelector = "h1.D\\(ib\\)";

  quoteQuerySelector = ".Fz\\(36px\\)";

  exchangeQuerySelector = ".Mt\\(-5px\\) > div:nth-child(2) > span:nth-child(1)";

  dividendCurrencyQuerySelector = "div.Mt\\(20px\\) > span:nth-child(1) > span:nth-child(1)";

  dividendHistoryTableQuerySelector = "table tbody";

  stockSummaryQuerySelector = "table.M\\(0\\):nth-child(1) tbody";

  constructor() {}

  /** ***************************************************************************************
   *
   *                                  Private Methods
   *
   **************************************************************************************** */

  private async makeRequest(url: string): Promise<string> {
    /** function to make request to appropriate Yahoo Finance page */

    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36"
        }
      });
      if (response && response.status !== 200) {
        throw {
          response,
          status: response.status
        };
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  /** ***************************************************************************************
   *                                  Helper Methods
   **************************************************************************************** */
  private parseStockName($: cheerio.Selector): string {
    return $(this.nameQuerySelector).text().toString().split("(")[0].trim();
  }

  private parseExchangeName($: cheerio.Selector): string {
    return $(this.exchangeQuerySelector).text().toString().split("-")[0].trim();
  }

  private parseStockPrice($: cheerio.Selector): number {
    return parseFloat($(this.quoteQuerySelector).text());
  }

  private parseStockCurrency($: cheerio.Selector): string {
    return $(this.dividendCurrencyQuerySelector).text();
  }

  private parseStockSummary($: cheerio.Selector): StockSummaryInterface {
    const defaultStringValue = "value Not Found";
    const defaultNumericValue = -1;

    let marketCap: string = defaultStringValue;
    let beta: number = defaultNumericValue;
    let peRatio: number = defaultNumericValue;
    let EPS: number = defaultNumericValue;
    let paymentDate: string = defaultStringValue;
    let exDividendDate: string = defaultStringValue;
    let dividendAmount: number = defaultNumericValue;
    let dividendYield: string = defaultStringValue;
    let dividendPayoutRatio: number = defaultNumericValue;

    $(this.stockSummaryQuerySelector)
      .children("tr")
      .each((index, row) => {
        const rowInfo = $(row)
          .children("td")
          .map((_index, col) => $(col).text())
          .get();

        const [rowKey, rowValue] = rowInfo;
        switch (rowKey) {
          case "Market Cap":
            marketCap = rowValue;
            break;
          case "Beta (5Y Monthly)":
            beta = parseFloat(rowValue);
            break;
          case "PE Ratio (TTM)":
            peRatio = parseFloat(rowValue);
            break;
          case "EPS (TTM)":
            EPS = parseFloat(rowValue);
            break;
          case "Earnings Date":
            paymentDate = rowValue;
            break;
          case "Ex-Dividend Date":
            exDividendDate = rowValue;
            break;
          case "Forward Dividend & Yield": {
            const dividendValueandYeild = rowValue.replace("(", "").replace(")", "").split(" ");
            dividendAmount = parseFloat(dividendValueandYeild[0]);
            [, dividendYield] = dividendValueandYeild;
            break;
          }
          default:
            break;
        }
      });

    if (dividendAmount && EPS) {
      dividendPayoutRatio = (dividendAmount / EPS) * 100;
    }

    return {
      marketCap,
      beta,
      peRatio,
      EPS,
      paymentDate,
      exDividendDate,
      dividendAmount,
      dividendYield,
      dividendPayoutRatio
    };
  }

  private parseDividendHistory($: cheerio.Selector): Array<DividendInformationItemInterface> {
    const dividendInformation: Array<DividendInformationItemInterface> = [];

    $(this.dividendHistoryTableQuerySelector)
      .children("tr")
      .each((index, row) => {
        const rowInfo = $(row)
          .children("td")
          .map((_index, col) => $(col).text())
          .get();
        /** in special cases no dividend value is present hence default value 0 */
        dividendInformation.push({
          date: new Date(rowInfo[0]).getTime(),
          dividend: parseFloat(rowInfo[1].replace("Dividend", "").trim()) || 0
        });
      });
    return dividendInformation;
  }

  private getAnnualDividends(
    DividendHistory: Array<DividendInformationItemInterface>,
    dividendAmount: number
  ): AnnualDividendInterface {
    const currentYear = new Date().getFullYear().toString();
    const AnnualDividends: AnnualDividendInterface = {};

    DividendHistory.forEach((DividendHistoryItem: DividendInformationItemInterface) => {
      const { date, dividend } = DividendHistoryItem;
      const dividendYear = new Date(date).getFullYear().toString();

      if (dividendYear in AnnualDividends) {
        AnnualDividends[dividendYear] += dividend;
      } else {
        AnnualDividends[dividendYear] = dividend;
      }
    });

    /** if dividendAmount is not provided remove it from Annual Dividend Object */
    if (dividendAmount) {
      AnnualDividends[currentYear] = dividendAmount;
    } else if (dividendAmount === 0) {
      // Usually the case of DFM stocks
      // Do nothing.
    } else {
      delete AnnualDividends[currentYear];
    }

    return AnnualDividends;
  }

  private getDividendDistribution(
    DividendHistory: Array<DividendInformationItemInterface>
  ): AnnualDividendDistributionInterface {
    const currentYear = new Date().getFullYear().toString();
    const dividendDistibution = {};

    DividendHistory.forEach((DividendHistoryItem: DividendInformationItemInterface) => {
      const { date, dividend } = DividendHistoryItem;
      const dividendYear = new Date(date).getFullYear().toString();
      const dividendMonth = new Date(date).getMonth().toString();

      if (dividendYear === currentYear) {
        dividendDistibution[dividendMonth] = dividend;
      }
    });

    return dividendDistibution;
  }

  private getAnnualDividendGrowth(
    AnnualDividends: AnnualDividendInterface
  ): AnnualDividendGrowthInterface {
    const dividendGrowth = (newDividend: number, oldDividend: number): number =>
      ((newDividend - oldDividend) / oldDividend) * 100;

    /** get Annual Dividends in ascending order */
    const AnnualDividendYearsArray = Object.keys(AnnualDividends)
      .map(Number)
      .sort((a: number, b: number) => a - b);
    const AnnualDividendGrowth: AnnualDividendGrowthInterface = {};

    /** skipCalculation when
     * initial year of paying dividends
     * previous year no dividend was paid
     */
    AnnualDividendYearsArray.forEach((AnnualDividendYear: number, index: number) => {
      const currentDividends = AnnualDividends[AnnualDividendYear];

      const previousYear = AnnualDividendYear - 1;
      const previousYearEntry = AnnualDividendYearsArray[index - 1];

      const skipCalculation = index === 0 || previousYear !== previousYearEntry;

      if (skipCalculation) {
        /** the first ever dividend year has no growth */
        AnnualDividendGrowth[AnnualDividendYear] = {
          dividend: currentDividends
        };
      }

      const previousDividends = AnnualDividends[previousYearEntry];
      AnnualDividendGrowth[AnnualDividendYear] = {
        dividend: currentDividends,
        growth: dividendGrowth(currentDividends, previousDividends)
      };
    });

    return AnnualDividendGrowth;
  }

  /** ***************************************************************************************
   *
   *                                   Public Methods
   *
   **************************************************************************************** */

  public async fetchHTML(url: string) {
    return this.makeRequest(url);
  }

  public parsePrimaryInformation(parser: cheerio.Root): PrimaryDividendInformationDTO {
    const name = this.parseStockName(parser);
    const price = this.parseStockPrice(parser);
    const exchange = this.parseExchangeName(parser);
    const stockSummary = this.parseStockSummary(parser);

    return {
      name,
      price,
      exchange,
      stockSummary
    };
  }

  public parseDividendInformation(
    parser: cheerio.Root,
    stockSummary: StockSummaryInterface
  ): ParseDividendInformationDTO {
    const dividendCurrency = this.parseStockCurrency(parser);
    const DividendHistory = this.parseDividendHistory(parser);
    const AnnualDividends = this.getAnnualDividends(DividendHistory, stockSummary.dividendAmount);
    const dividendDistibution = this.getDividendDistribution(DividendHistory);
    const AnnualDividendGrowth = this.getAnnualDividendGrowth(AnnualDividends);

    return {
      dividendCurrency,
      dividendDistibution,
      AnnualDividends,
      AnnualDividendGrowth
    };
  }

  public async getHistoricalData(ticker: string, queryOptions: ChartOptionsWithReturnObject) {
    // const queryOptions = { period1: "2021-05-08" /* ... */, interval: "1mo" };
    const result = await yahooFinance.chart(ticker, queryOptions);
    return result;
  }
}

export default YahooFinanceModel;
