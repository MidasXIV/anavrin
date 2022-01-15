import requestjs from "request";
import cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

interface DividendInformationInterface {
  symbol: string;
  exchange: string;
  name: string;
  currency: string;
  latestPrice: number;
  industry: string;
  sector: string;

  paymentDate: string;
  exDividendDate: string;

  recordDate: number;
  declaredDate: number;

  dividendAmount: number;
  dividendYeild: string;
  dividendPayoutRatio: number;
  frequency: string;

  peRatio: number;
  EPS: number;
}

interface DividendInformationInterface {
  symbol: string;
  name: string;
  price: number;
  exchange: string;
}

interface StockSummaryInterface {
  marketCap: string;
  beta: number;
  peRatio: number;
  EPS: number;
  paymentDate: string;
  exDividendDate: string;
  dividendAmount: number;
  dividendYeild: string;
  dividendPayoutRatio: number;
}

interface DividendInformationItemInterface {
  date: number;
  dividend: number;
}

interface AnnualDividendInterface {
  [key: string]: number;
}

interface AnnualDividendGrowthInterface {
  [key: string]: {
    dividend: number;
    growth?: number;
  };
}

interface AnnualDividendGrowthItemInterface {
  date: number;
  dividend: number;
  growth: number;
}

export default class DividendController {
  nameQuerySelector = "h1.D\\(ib\\)";

  quoteQuerySelector = ".Fz\\(36px\\)";

  exchangeQuerySelector = ".Mt\\(-5px\\) > div:nth-child(2) > span:nth-child(1)";

  dividendCurrencyQuerySelector = "div.Mt\\(20px\\) > span:nth-child(1) > span:nth-child(1)";

  dividendHistoryTableQuerySelector = "table tbody";

  stockSummaryQuerySelector = "table.M\\(0\\):nth-child(1) tbody";

  /** ***************************************************************************************
   *
   *                                  Private Methods
   *
   **************************************************************************************** */

  private static getYahooFinanceDividendHistoryURL(ticker: string): string {
    /** function to get Yahoo Finance Dividend History Page URL corresponding to input ticker */
    return `https://finance.yahoo.com/quote/${ticker}/history?period1=345427200&period2=1585353600&interval=div%7Csplit&filter=div&frequency=1d`;
  }

  private static getYahooFinancedividendProfileURL(ticker: string): string {
    /** function to get Yahoo Finance Summary Page URL corresponding to input ticker */
    return `https://finance.yahoo.com/quote/${ticker}?p=${ticker}`;
  }

  private static makeRequest(url: string): Promise<string> {
    /** function to make request to appropriate Yahoo Finance page */
    return new Promise<string>((resolve, reject) => {
      requestjs(
        {
          method: "GET",
          url,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36"
          }
        },
        (error, response, html) => {
          if (error) reject(error);

          if (response && response.statusCode !== 200) {
            reject({
              response,
              statusCode: response.statusCode
            });
          }

          resolve(html);
        }
      );
    });
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
    let dividendYeild: string = defaultStringValue;
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
            [, dividendYeild] = dividendValueandYeild;
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
      dividendYeild,
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

  private static getAnnualDividends(
    DividendHistory: Array<DividendInformationItemInterface>,
    dividendAmount: number
  ): AnnualDividendInterface {
    const currentYear = new Date().getFullYear().toString();
    const AnnualDividends: AnnualDividendInterface = {};

    DividendHistory.forEach((DividendHistoryItem: DividendInformationItemInterface) => {
      const dividendYear = new Date(DividendHistoryItem.date).getFullYear().toString();

      if (dividendYear in AnnualDividends) {
        AnnualDividends[dividendYear] += DividendHistoryItem.dividend;
      } else {
        AnnualDividends[dividendYear] = DividendHistoryItem.dividend;
      }
    });

    /** if dividendAmount is not provided remove it from Annual Dividend Object */
    if (dividendAmount) {
      AnnualDividends[currentYear] = dividendAmount;
    } else {
      delete AnnualDividends[currentYear];
    }

    return AnnualDividends;
  }

  private static getAnnualDividendGrowth(
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
   *                            Public / Router Endpoint Methods
   *
   **************************************************************************************** */

  public getDividendInfo(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    return new Promise(resolve => {
      const ticker = Array.isArray(request.query.ticker)
        ? request.query.ticker[0]
        : request.query.ticker;
      const yahooFinancedividendProfileURL =
        DividendController.getYahooFinancedividendProfileURL(ticker);

      let symbol: string;
      let name: string;
      let price: number;
      let exchange: string;
      let stockSummary: StockSummaryInterface;

      DividendController.makeRequest(yahooFinancedividendProfileURL)
        .then(html => {
          console.debug(`fetched Dividend Information for ${ticker}`);
          const $ = cheerio.load(html);

          symbol = ticker;
          name = this.parseStockName($);
          price = this.parseStockPrice($);
          exchange = this.parseExchangeName($);
          stockSummary = this.parseStockSummary($);

          const yahooFinancedividendHistoryURL =
            DividendController.getYahooFinanceDividendHistoryURL(ticker);
          return DividendController.makeRequest(yahooFinancedividendHistoryURL);
        })
        .then(html => {
          console.debug(`fetched Dividend History Information for ${ticker}`);
          const $ = cheerio.load(html);

          const dividendCurrency = this.parseStockCurrency($);
          const DividendHistory = this.parseDividendHistory($);
          const AnnualDividends = DividendController.getAnnualDividends(
            DividendHistory,
            stockSummary.dividendAmount
          );
          const AnnualDividendGrowth = DividendController.getAnnualDividendGrowth(AnnualDividends);

          response.json({
            symbol,
            name,
            price,
            exchange,
            ...stockSummary,
            dividendCurrency,
            AnnualDividends,
            AnnualDividendGrowth
          });

          resolve();
        });
    });
  }

  /** Endpoint Deprecated */
  // eslint-disable-next-line class-methods-use-this
  public getDividendHistory(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    return new Promise(resolve => {
      /*
       ** Todo - error handling when ticker symbol is invalid
       ** Todo - do not hard code time intervals.
       */
      const ticker = Array.isArray(request.query.ticker)
        ? request.query.ticker[0]
        : request.query.ticker;

      console.debug("fetching Info");

      const yahooFinancedividendHistoryURL =
        DividendController.getYahooFinanceDividendHistoryURL(ticker);
      DividendController.makeRequest(yahooFinancedividendHistoryURL).then(html => {
        console.debug(`fetched Dividend Information for ${ticker}`);

        const $ = cheerio.load(html);

        const dividendInformation: Array<DividendInformationItemInterface> = [];
        const dividendCurrency: string = $(
          "div.Mt\\(20px\\) > span:nth-child(1) > span:nth-child(1)"
        ).text();

        $("table tbody")
          .children("tr")
          .each((index, row) => {
            const rowInfo = $(row)
              .children("td")
              .map((_index, col) => $(col).text())
              .get();
            dividendInformation.push({
              date: new Date(rowInfo[0]).getTime(),
              dividend: parseFloat(rowInfo[1].replace("Dividend", "").trim())
            });
          });

        const dividendHistoryReturnObject = {
          currency: dividendCurrency,
          dividendHistory: dividendInformation
        };

        response.json(dividendHistoryReturnObject);
        resolve();
      });
    });
  }
}
