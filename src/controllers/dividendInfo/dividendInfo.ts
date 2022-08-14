import cheerio from "cheerio";

export default class DividendInfo implements IDividendInfo {
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

  public async execute(ticker: string): Promise<DividendInfoResponse> {
    const yahooFinancedividendProfileURL = this.getYahooFinancedividendProfileURL(ticker);

    const symbol: string = ticker;

    const dividendProfilePage = await this.userRepo.fetchHTML(yahooFinancedividendProfileURL);
    const dividendProfilePageParser = cheerio.load(dividendProfilePage);
    const { name, price, exchange, stockSummary }: PrimaryDividendInformationDTO =
      this.userRepo.parsePrimaryInformation(dividendProfilePageParser);

    if (name === "" && Number.isNaN(price)) {
      return { left: { type: "InvalidTicker" } };
    }
    if (Number.isNaN(stockSummary.dividendAmount)) {
      return { left: { type: "NoDividendInfo" } };
    }
    const yahooFinanceDividendHistoryURL = this.getYahooFinanceDividendHistoryURL(ticker);

    const dividendHistoryPage = await this.userRepo.fetchHTML(yahooFinanceDividendHistoryURL);
    const dividendHistoryPageParser = cheerio.load(dividendHistoryPage);
    const { dividendCurrency, AnnualDividends, AnnualDividendGrowth }: ParseDividendInformationDTO =
      this.userRepo.parseDividendInformation(dividendHistoryPageParser, stockSummary);

    return {
      right: {
        symbol,
        name,
        price,
        exchange,
        ...stockSummary,
        dividendCurrency,
        AnnualDividends,
        AnnualDividendGrowth
      }
    };
  }
}
