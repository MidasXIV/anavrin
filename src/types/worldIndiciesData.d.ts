interface IWorldIndiciesItem {
  symbol: string;
  name: string;
  lastPrice: number;
  change: number;
  percentageChange: number;
  volume: string;
  intradayHighLow: string;
  yearlyRange: string;
  dayChart: string;
}

type UnableToFetchData = {
  type: "UnableToFetchData";
};

type UnableToParseData = {
  type: "UnableToParseData";
};

interface WorldIndiciesDTO {
  worldIndiciesData: Array<IWorldIndiciesItem>;
}

type WorldIndiciesResponse = Either<UnableToFetchData | UnableToParseData, WorldIndiciesDTO>;

interface IWorldIndiciesModel {
  getWorldIndiciesData(): Promise<WorldIndiciesResponse>;
}
