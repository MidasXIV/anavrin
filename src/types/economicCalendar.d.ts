interface IEcnomicEvent {
  actual: string;
  expected: string;
  for: string;
  impact: string;
  prior: string;
  release: string;
  time: string;
}

interface IEcnomicCalandarItem {
  day: string;
  events: Array<IEcnomicEvent>;
}

type IEcnomicCalandarItemDay = IEcnomicCalandarItem["day"];

type UnableToFetchData = {
  type: "UnableToFetchData";
};

type UnableToParseData = {
  type: "UnableToParseData";
};

interface EcnomicEventsDTO {
  events: Array<IEcnomicCalandarItem>;
}

type EcnomicEventsResponse = Either<UnableToFetchData | UnableToParseData, EcnomicEventsDTO>;

interface IFinvizEconomicCalendarModel {
  getEcnomicEvents(): Promise<EcnomicEventsResponse>;
}

enum CalendarMode {
  OneMonth = "1-month",
  SixMonths = "6-months",
  EntireYear = "entire-year",
  YearToMonth = "year-to-month"
}