interface StockSummaryInterface {
  marketCap: string;
  beta: number;
  peRatio: number;
  EPS: number;
  paymentDate: string;
  exDividendDate: string;
  dividendAmount: number;
  dividendYield: string;
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

interface PrimaryDividendInformationDTO {
  name: string;
  price: number;
  exchange: string;
  stockSummary: StockSummaryInterface;
}

interface ParseDividendInformationDTO {
  dividendCurrency: string;
  AnnualDividends: AnnualDividendInterface;
  AnnualDividendGrowth: AnnualDividendGrowthInterface;
}

interface DividendInfoScraper {
  parsePrimaryInformation(parser: cheerio.Root): PrimaryDividendInformationDTO;
  parseDividendInformation(
    parser: cheerio.Root,
    stockSummary: StockSummaryInterface
  ): ParseDividendInformationDTO;
}
