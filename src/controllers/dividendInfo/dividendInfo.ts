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

export default class DividendInfo {
  private userRepo;

  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  /** ***************************************************************************************
   *
   *                                  Private Methods
   *
   **************************************************************************************** */

  private getYahooFinancedividendProfileURL(ticker: string): string {
    /** function to get Yahoo Finance Summary Page URL corresponding to input ticker */
    return `https://finance.yahoo.com/quote/${ticker}?p=${ticker}`;
  }

  private getYahooFinanceDividendHistoryURL(ticker: string): string {
    /** function to get Yahoo Finance Dividend History Page URL corresponding to input ticker */
    return `https://finance.yahoo.com/quote/${ticker}/history?period1=345427200&period2=1585353600&interval=div%7Csplit&filter=div&frequency=1d`;
  }

  /** ***************************************************************************************
   *
   *                            Public / Router Endpoint Methods
   *
   **************************************************************************************** */

  public async execute(ticker: string) {
    const yahooFinancedividendProfileURL = this.getYahooFinancedividendProfileURL(ticker);

    const symbol: string = ticker;
    let name: string;
    let price: number;
    let exchange: string;
    let stockSummary: StockSummaryInterface;

    const dividendProfilePage = await this.userRepo.fetchHTML(yahooFinancedividendProfileURL);
    const dividendProfilePageParser = cheerio.load(dividendProfilePage);
    ({ name, price, exchange, stockSummary } =
      this.userRepo.parsePrimaryInformation(dividendProfilePageParser));

    if (name === "" && Number.isNaN(price)) {
      return { type: "InvalidTicker" };
    }
    if (Number.isNaN(stockSummary.dividendAmount)) {
      return { type: "NoDividendInfo" };
    }
    const yahooFinanceDividendHistoryURL = this.getYahooFinanceDividendHistoryURL(ticker);

    const dividendHistoryPage = await this.userRepo.fetchHTML(yahooFinanceDividendHistoryURL);
    const dividendHistoryPageParser = cheerio.load(dividendHistoryPage);
    const { dividendCurrency, AnnualDividends, AnnualDividendGrowth } =
      this.userRepo.parseDividendInformation(dividendHistoryPageParser, stockSummary);

    return {
      symbol,
      name,
      price,
      exchange,
      ...stockSummary,
      dividendCurrency,
      AnnualDividends,
      AnnualDividendGrowth
    };
  }

  /** Endpoint Deprecated */
  // eslint-disable-next-line class-methods-use-this
  // public getDividendHistory(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  //   return new Promise(resolve => {
  //     /*
  //      ** Todo - error handling when ticker symbol is invalid
  //      ** Todo - do not hard code time intervals.
  //      */
  //     const ticker = Array.isArray(request.query.ticker)
  //       ? request.query.ticker[0]
  //       : request.query.ticker;

  //     console.debug("fetching Info");

  //     const yahooFinancedividendHistoryURL =
  //       DividendController.getYahooFinanceDividendHistoryURL(ticker);
  //     DividendController.makeRequest(yahooFinancedividendHistoryURL).then(html => {
  //       console.debug(`fetched Dividend Information for ${ticker}`);

  //       const $ = cheerio.load(html);

  //       const dividendInformation: Array<DividendInformationItemInterface> = [];
  //       const dividendCurrency: string = $(
  //         "div.Mt\\(20px\\) > span:nth-child(1) > span:nth-child(1)"
  //       ).text();

  //       $("table tbody")
  //         .children("tr")
  //         .each((index, row) => {
  //           const rowInfo = $(row)
  //             .children("td")
  //             .map((_index, col) => $(col).text())
  //             .get();
  //           dividendInformation.push({
  //             date: new Date(rowInfo[0]).getTime(),
  //             dividend: parseFloat(rowInfo[1].replace("Dividend", "").trim())
  //           });
  //         });

  //       const dividendHistoryReturnObject = {
  //         currency: dividendCurrency,
  //         dividendHistory: dividendInformation
  //       };

  //       response.json(dividendHistoryReturnObject);
  //       resolve();
  //     });
  //   });
  // }
}
