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

export class DividendController {
  nameQuerySelector = "h1.D\\(ib\\)";
  quoteQuerySelector = ".Fz\\(36px\\)";
  exchangeQuerySelector =
    ".Mt\\(-5px\\) > div:nth-child(2) > span:nth-child(1)";
  dividendCurrencyQuerySelector =
    "div.Mt\\(20px\\) > span:nth-child(1) > span:nth-child(1)";
  dividendHistoryTableQuerySelector = "table tbody";
  stockSummaryQuerySelector = "table.M\\(0\\):nth-child(1) tbody";

  /*****************************************************************************************
   *
   *                                  Private Methods
   *
   *****************************************************************************************/

  private getYahooFinanceDividendHistoryURL(ticker: string): string {
    /** function to get Yahoo Finance Dividend History Page URL corresponding to input ticker */
    return `https://finance.yahoo.com/quote/${ticker}/history?period1=345427200&period2=1585353600&interval=div%7Csplit&filter=div&frequency=1d`;
  }

  private getYahooFinancedividendProfileURL(ticker: string): string {
    /** function to get Yahoo Finance Summary Page URL corresponding to input ticker */
    return `https://finance.yahoo.com/quote/${ticker}?p=${ticker}`;
  }

  private makeRequest(url: string): Promise<string> {
    /** function to make request to appropriate Yahoo Finance page */
    return new Promise<string>((resolve, reject) => {
      requestjs(
        {
          method: "GET",
          url: url,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
          },
        },
        (error, response, html) => {
          if (error) reject(error);

          if (response && response.statusCode !== 200) {
            reject({
              response,
              statusCode: response.statusCode,
            });
          }

          resolve(html);
        }
      );
    });
  }

  /*****************************************************************************************
   *                                  Helper Methods
   *****************************************************************************************/

  private parseStockName($: CheerioStatic): string {
    return $(this.nameQuerySelector).text().toString().split("(")[0].trim();
  }

  private parseExchangeName($: CheerioStatic): string {
    return $(this.exchangeQuerySelector).text().toString().split("-")[0].trim();
  }

  private parseStockPrice($: CheerioStatic): number {
    return parseFloat($(this.quoteQuerySelector).text());
  }

  private parseStockCurrency($: CheerioStatic): string {
    return $(this.dividendCurrencyQuerySelector).text();
  }

  private parseStockSummary($: CheerioStatic): StockSummaryInterface {
    const defaultStringValue = "value Not Found",
      defaultNumericValue = -1;

    let marketCap: string = defaultStringValue,
      beta: number = defaultNumericValue,
      peRatio: number = defaultNumericValue,
      EPS: number = defaultNumericValue,
      paymentDate: string = defaultStringValue,
      exDividendDate: string = defaultStringValue,
      dividendAmount: number = defaultNumericValue,
      dividendYeild: string = defaultStringValue,
      dividendPayoutRatio: number = defaultNumericValue;

    $(this.stockSummaryQuerySelector)
      .children("tr")
      .each(function (index, row) {
        const rowInfo = $(row)
          .children("td")
          .map(function (_index, col) {
            return $(col).text();
          })
          .get();

        switch (rowInfo[0]) {
          case "Market Cap":
            marketCap = rowInfo[1];
            break;
          case "Beta (5Y Monthly)":
            beta = parseFloat(rowInfo[1]);
            break;
          case "PE Ratio (TTM)":
            peRatio = parseFloat(rowInfo[1]);
            break;
          case "EPS (TTM)":
            EPS = parseFloat(rowInfo[1]);
            break;
          case "Earnings Date":
            paymentDate = rowInfo[1];
            break;
          case "Ex-Dividend Date":
            exDividendDate = rowInfo[1];
            break;
          case "Forward Dividend & Yield": {
            const dividendValueandYeild = rowInfo[1]
              .replace("(", "")
              .replace(")", "")
              .split(" ");
            dividendAmount = parseFloat(dividendValueandYeild[0]);
            dividendYeild = dividendValueandYeild[1];
            break;
          }
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
      dividendPayoutRatio,
    };
  }

  private parseDividendHistory(
    $: CheerioStatic
  ): Array<DividendInformationItemInterface> {
    const dividendInformation: Array<DividendInformationItemInterface> = [];

    $(this.dividendHistoryTableQuerySelector)
      .children("tr")
      .each(function (index, row) {
        const rowInfo = $(row)
          .children("td")
          .map((_index, col) => $(col).text())
          .get();
        /** in special cases no dividend value is present hence default value 0 */
        dividendInformation.push({
          date: new Date(rowInfo[0]).getTime(),
          dividend: parseFloat(rowInfo[1].replace("Dividend", "").trim()) || 0,
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
    DividendHistory.forEach(
      (DividendHistoryItem: DividendInformationItemInterface) => {
        const dividendYear = new Date(DividendHistoryItem.date)
          .getFullYear()
          .toString();
        AnnualDividends[dividendYear]
          ? (AnnualDividends[dividendYear] += DividendHistoryItem.dividend)
          : (AnnualDividends[dividendYear] = DividendHistoryItem.dividend);
      }
    );

    /** if dividendAmount is not provided remove it from Annual Dividend Object */
    if (dividendAmount) {
      AnnualDividends[currentYear] = dividendAmount;
    } else {
      delete AnnualDividends[currentYear];
    }

    return AnnualDividends;
  }

  private getAnnualDividendGrowth(
    AnnualDividends: AnnualDividendInterface
  ): AnnualDividendGrowthInterface {
    const dividendGrowth = (
      newDividend: number,
      oldDividend: number
    ): number => {
      return ((newDividend - oldDividend) / oldDividend) * 100;
    };

    /** get Annual Dividends in ascending order */
    const AnnualDividendYearsArray = Object.keys(AnnualDividends)
      .map(Number)
      .sort((a: number, b: number) => a - b);
    const AnnualDividendGrowth: AnnualDividendGrowthInterface = {};

    /** skipCalculation when
     * initial year of paying dividends
     * previous year no dividend was paid
     */
    AnnualDividendYearsArray.forEach(
      (AnnualDividendYear: number, index: number) => {
        const currentDividends = AnnualDividends[AnnualDividendYear];

        const previousYear = AnnualDividendYear - 1;
        const previousYearEntry = AnnualDividendYearsArray[index - 1];

        const skipCalculation =
          index === 0 || previousYear !== previousYearEntry;

        if (skipCalculation) {
          /** the first ever dividend year has no growth */
          AnnualDividendGrowth[AnnualDividendYear] = {
            dividend: currentDividends,
          };
        }

        const previousDividends = AnnualDividends[previousYearEntry];
        AnnualDividendGrowth[AnnualDividendYear] = {
          dividend: currentDividends,
          growth: dividendGrowth(currentDividends, previousDividends),
        };
      }
    );

    return AnnualDividendGrowth;
  }

  /*****************************************************************************************
   *
   *                            Public / Router Endpoint Methods
   *
   *****************************************************************************************/

  public getDividendInfo(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    return new Promise((resolve) => {
      const ticker = Array.isArray(request.query.ticker)
        ? request.query.ticker[0]
        : request.query.ticker;
      const yahooFinancedividendProfileURL = this.getYahooFinancedividendProfileURL(
        ticker
      );

      let symbol: string,
        name: string,
        price: number,
        exchange: string,
        stockSummary: StockSummaryInterface;

      this.makeRequest(yahooFinancedividendProfileURL)
        .then((html) => {
          console.debug(`fetched Dividend Information for ${ticker}`);
          const $ = cheerio.load(html);

          symbol = ticker;
          name = this.parseStockName($);
          price = this.parseStockPrice($);
          exchange = this.parseExchangeName($);
          stockSummary = this.parseStockSummary($);

          const yahooFinancedividendProfileURL = this.getYahooFinanceDividendHistoryURL(
            ticker
          );
          return this.makeRequest(yahooFinancedividendProfileURL);
        })
        .then((html) => {
          console.debug(`fetched Dividend History Information for ${ticker}`);
          const $ = cheerio.load(html);

          const dividendCurrency = this.parseStockCurrency($);
          const DividendHistory = this.parseDividendHistory($);
          const AnnualDividends = this.getAnnualDividends(
            DividendHistory,
            stockSummary.dividendAmount
          );
          const AnnualDividendGrowth = this.getAnnualDividendGrowth(
            AnnualDividends
          );

          response.json({
            symbol,
            name,
            price,
            exchange,
            ...stockSummary,
            dividendCurrency,
            AnnualDividends,
            AnnualDividendGrowth,
          });

          resolve();
        });
    });
  }

  public getDividendHistory(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    return new Promise((resolve) => {
      /*
       ** Todo - error handling when ticker symbol is invalid
       ** Todo - do not hard code time intervals.
       */
      const yahooFinanceDividendHistoryURL = (ticker: string): string =>
        `https://finance.yahoo.com/quote/${ticker}/history?period1=345427200&period2=1585353600&interval=div%7Csplit&filter=div&frequency=1d`;
      const ticker = Array.isArray(request.query.ticker)
        ? request.query.ticker[0]
        : request.query.ticker;
      console.debug("fetching Info");
      requestjs(
        {
          method: "GET",
          url: yahooFinanceDividendHistoryURL(ticker),
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
          },
        },
        (err, res, html) => {
          console.debug("fetched Info");
          if (err) return console.error(err);

          const $ = cheerio.load(html);

          const dividendInformation: Array<DividendInformationItemInterface> = [];
          const dividendCurrency: string = $(
            "div.Mt\\(20px\\) > span:nth-child(1) > span:nth-child(1)"
          ).text();

          $("table tbody")
            .children("tr")
            .each(function (index, row) {
              const rowInfo = $(row)
                .children("td")
                .map((_index, col) => $(col).text())
                .get();
              dividendInformation.push({
                date: new Date(rowInfo[0]).getTime(),
                dividend: parseFloat(rowInfo[1].replace("Dividend", "").trim()),
              });
            });

          const dividendHistoryReturnObject = {
            currency: dividendCurrency,
            dividendHistory: dividendInformation,
          };

          response.json(dividendHistoryReturnObject);
          resolve();
        }
      );
    });
  }
}
