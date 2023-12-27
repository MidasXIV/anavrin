import cheerio from "cheerio";
import Result from "../../lib/result";
import makeRequest from "../../utils/makeRequest";

export default class FinvizEconomicCalendarModel implements IFinvizEconomicCalendarModel {
  private baseURL = "https://finviz.com/calendar.ashx";

  calendarSelector = ".content > .fv-container > .calendar";

  /** ***************************************************************************************
   *
   *                                  Private Methods
   *
   **************************************************************************************** */

  private async fetchFinvizEcnomicCalendarPage() {
    return makeRequest(this.baseURL, true);
  }

  private parseCalendar($: cheerio.Selector): Array<IEcnomicCalandarItem> {
    const tables = $(this.calendarSelector).children("table");
    const IMPACT_INDEX = 3; // Used to keep track of impact img index in table row
    const tableData = [];

    // console.log(`Information for the next ${tables.length} Days.`);

    tables.each((index, entry) => {
      const tableDataItem = {
        day: "",
        events: []
      };

      const tableHead = $(entry).children("thead").eq(0);
      const tableHeadEntries = $(tableHead).children("tr").get();
      $(tableHeadEntries).each((tableEntryIndex, row) => {
        const hhd = $(row)
          .children("th")
          .map((_index, col) => $(col).text())
          .get();
        if (tableEntryIndex === 0) {
          // eslint-disable-next-line prefer-destructuring
          tableDataItem.day = hhd[0];
        }
      });

      const tableBody = $(entry).children("tbody").eq(0);
      const tableEntries = $(tableBody).children("tr").get();

      $(tableEntries).each((tableEntryIndex, row) => {
        const hhd = $(row)
          .children("td")
          .map((_index, col) => {
            if (_index === IMPACT_INDEX) {
              const imapctSrc = $(col).children("img").eq(0).attr("src");
              return imapctSrc ? imapctSrc.split("_")[1]?.split(".")[0] : "";
            }
            return $(col).text();
          })
          .get();

        tableDataItem.events.push({
          time: hhd[0],
          release: hhd[2],
          impact: hhd[3],
          for: hhd[4],
          actual: hhd[5],
          expected: hhd[6],
          prior: hhd[7]
        });
      });

      tableData.push(tableDataItem);
      // console.log(`${tableEntries.length - 1} Events on :: ${tableDataItem.day}`);
    });

    // console.log(tableData);

    return tableData;
  }
  /** ***************************************************************************************
   *
   *                                   Public Methods
   *
   **************************************************************************************** */

  public async getEcnomicEvents(): Promise<EcnomicEventsResponse> {
    const { data: finvizEconomicCalendarPage } = await this.fetchFinvizEcnomicCalendarPage();
    if (!finvizEconomicCalendarPage) {
      // Unable to fetch data
      return Result.fail({ type: "UnableToFetchData" });
    }
    let events = [];

    try {
      const finvizEconomicCalendarPageParser = cheerio.load(finvizEconomicCalendarPage);
      events = this.parseCalendar(finvizEconomicCalendarPageParser);
    } catch (e) {
      console.error(e);
      return Result.fail({ type: "UnableToParseData" });
    }

    return Result.ok({
      events
    });
  }
}
