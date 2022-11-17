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

  private isDFMTicker(ticker: string): boolean {
    return ticker.endsWith(".AE");
  }

  private coerceForDFM({
    price,
    AnnualDividends
  }: {
    price: number;
    AnnualDividends: AnnualDividendInterface;
  }) {
    const year = new Date().getFullYear();
    const dividend = AnnualDividends[year];

    return {
      dividend,
      dividendYield: (dividend / price) * 100
    };
  }
  /** ***************************************************************************************
   *
   *                            Public / Router Endpoint Methods
   *
   **************************************************************************************** */

  public async execute(ticker: string): Promise<DividendInfoResponse> {
    const yahooFinancedividendProfileURL = this.getYahooFinancedividendProfileURL(ticker);

    const symbol: string = ticker;
    const isDFMTicker = this.isDFMTicker(ticker);

    const dividendProfilePage = await this.dividendInfoScrapper.fetchHTML(
      yahooFinancedividendProfileURL
    );
    const dividendProfilePageParser = cheerio.load(dividendProfilePage);
    const { name, price, exchange, stockSummary }: PrimaryDividendInformationDTO =
      this.dividendInfoScrapper.parsePrimaryInformation(dividendProfilePageParser);

    // DFM stocks don't have dividend Data updated.
    stockSummary.dividendAmount = isDFMTicker ? 0 : stockSummary.dividendAmount;

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

    if (isDFMTicker) {
      const { dividend, dividendYield } = this.coerceForDFM({ price, AnnualDividends });
      stockSummary.dividendAmount = dividend;
      stockSummary.dividendYield = dividendYield.toString();
    }
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
