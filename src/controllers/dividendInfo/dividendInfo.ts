import cheerio from "cheerio";
import Result from "../../lib/result";

export default class DividendInfo implements IDividendInfo {
  private dividendInfoScrapper;

  constructor(dividendInfoScrapper: DividendInfoScraper) {
    this.dividendInfoScrapper = dividendInfoScrapper;
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
    return `https://finance.yahoo.com/quote/${ticker}/history?period1=1286755200&period2=1666915200&interval=capitalGain%7Cdiv%7Csplit&filter=div&frequency=1mo&includeAdjustedClose=true`;
  }

  /** ***************************************************************************************
   *
   *                            Public / Router Endpoint Methods
   *
   **************************************************************************************** */

  public async execute(ticker: string): Promise<DividendInfoResponse> {
    const yahooFinancedividendProfileURL = this.getYahooFinancedividendProfileURL(ticker);

    const symbol: string = ticker;

    const dividendProfilePage = await this.dividendInfoScrapper.fetchHTML(
      yahooFinancedividendProfileURL
    );
    const dividendProfilePageParser = cheerio.load(dividendProfilePage);
    const { name, price, exchange, stockSummary }: PrimaryDividendInformationDTO =
      this.dividendInfoScrapper.parsePrimaryInformation(dividendProfilePageParser);

    if (name === "" && Number.isNaN(price)) {
      return Result.fail({ type: "InvalidTicker" });
    }
    if (Number.isNaN(stockSummary.dividendAmount)) {
      return Result.fail({ type: "NoDividendInfo" });
    }
    const yahooFinanceDividendHistoryURL = this.getYahooFinanceDividendHistoryURL(ticker);

    const dividendHistoryPage = await this.dividendInfoScrapper.fetchHTML(
      yahooFinanceDividendHistoryURL
    );
    const dividendHistoryPageParser = cheerio.load(dividendHistoryPage);
    const { dividendCurrency, AnnualDividends, AnnualDividendGrowth }: ParseDividendInformationDTO =
      this.dividendInfoScrapper.parseDividendInformation(dividendHistoryPageParser, stockSummary);

    return Result.ok({
      symbol,
      name,
      price,
      exchange,
      ...stockSummary,
      dividendCurrency,
      AnnualDividends,
      AnnualDividendGrowth
    });
  }
}
