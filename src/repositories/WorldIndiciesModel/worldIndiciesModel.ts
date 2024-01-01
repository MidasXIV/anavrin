import cheerio from "cheerio";
import Result from "../../lib/result";
import makeRequest from "../../utils/makeRequest";

export default class WorldIndiciesModel implements IWorldIndiciesModel {
  private baseURL = "https://finance.yahoo.com/world-indices/";

  tableSelector = "#list-res-table > div > table";

  /** ***************************************************************************************
   *
   *                                  Private Methods
   *
   **************************************************************************************** */

  private async fetchYahooWorldIndiciesPage() {
    return makeRequest(this.baseURL, true);
  }

  private parseTable($: cheerio.Selector): Array<IWorldIndiciesItem> {
    const tables = $(this.tableSelector);
    const tableData = [];

    tables.each((index, entry) => {
      // const tableHead = $(entry).children("thead").eq(0);
      // const tableHeadEntries = $(tableHead).children("tr").get();
      // $(tableHeadEntries).each((tableEntryIndex, row) => {
      //   const hhd = $(row)
      //     .children("th")
      //     .map((_index, col) => $(col).text())
      //     .get();
      // });

      const tableBody = $(entry).children("tbody").eq(0);
      const tableEntries = $(tableBody).children("tr").get();

      $(tableEntries).each((tableEntryIndex, row) => {
        const hhd = $(row)
          .children("td")
          .map((_index, col) => {
            if (_index === 6) {
              const canvas = $(col).children("canvas")[0];
              // console.log(canvas);
              // const base64 = canvas.toDataURL();
              // console.log(base64);
            }
            return $(col).text();
          })
          .get();

        tableData.push({
          symbol: hhd[0],
          name: hhd[1],
          lastPrice: hhd[2],
          change: Number.parseFloat(hhd[3]),
          percentageChange: Number.parseFloat(hhd[4]?.replace("%", "")),
          volume: hhd[5],
          intradayHighLow: hhd[6],
          yearlyRange: hhd[7],
          dayChart: hhd[8]
        });
      });
    });
    return tableData;
  }
  /** ***************************************************************************************
   *
   *                                   Public Methods
   *
   **************************************************************************************** */

  public async getWorldIndiciesData(): Promise<WorldIndiciesResponse> {
    const { data: yahooWorldIndiciesPage } = await this.fetchYahooWorldIndiciesPage();
    if (!yahooWorldIndiciesPage) {
      // Unable to fetch data
      return Result.fail({ type: "UnableToFetchData" });
    }
    let worldIndiciesData = [];

    try {
      const YahooWorldIndiciesPageParser = cheerio.load(yahooWorldIndiciesPage);
      worldIndiciesData = this.parseTable(YahooWorldIndiciesPageParser);
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "UnableToParseData" });
    }

    return Result.ok({
      worldIndiciesData
    });
  }
}
