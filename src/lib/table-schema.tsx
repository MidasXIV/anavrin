import { Code } from "@mantine/core";
import { Media, TableColumn } from "react-data-table-component";

type DividendDataRow = {
  title: string;
  symbol: string;
  sector: string;
  shares: string;
  avgPrice: string;
  marketPrice: string;
  costBasis: string;
  marketValue: string;
  netValue: string;
  earningPerShare: string;
  pricePerEarning: string;
  dividendAmount: string;
  dividendYield: string;
  yieldOnCost: string;
  income: string;
};

const DividendPortfolioSchema: TableColumn<DividendDataRow>[] = [
  {
    name: "Company Name",
    sortable: false,
    width: "150px",
    selector: row => row.title
    // cell: RowComponent,
    // style: { border: "1px solid" }
  },
  {
    name: "Symbol",
    selector: row => row.symbol,
    center: true,
    compact: true,
    sortable: true,
    width: "70px"
    // style: { border: "1px solid" }
  },
  {
    name: "Sector",
    selector: row => row.sector,
    // compact: true,
    width: "120px"
    // style: { border: "1px solid" }
  },
  {
    name: "Shares",
    selector: row => row.shares,
    compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Average Price",
    selector: row => row.avgPrice,
    // compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Market Price",
    selector: row => row.marketPrice,
    // compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Cost Basis",
    selector: row => row.costBasis,
    width: "70px",
    center: true,
    hide: Media.SM
    // compact: true,
    // style: { border: "1px solid" }
  },
  {
    name: "Market Value",
    selector: row => row.marketValue,
    // compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Gain / Loss",
    selector: row => row.netValue,
    compact: true,
    width: "100px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "EPS",
    selector: row => row.earningPerShare,
    compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "P/E",
    selector: row => row.pricePerEarning,
    compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Annual Dividend",
    selector: row => row.dividendAmount,
    // compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Dividend Yield",
    selector: row => row.dividendYield,
    // compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Yield on Cost",
    selector: row => row.yieldOnCost,
    // compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "Annual Income",
    selector: row => row.income,
    // compact: true,
    width: "70px",
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  }
];

type DFMDividendDataRow = {
  title: string;
  symbol: string;
  marketPrice: string;
  earningPerShare: string;
  dividendAmount: string;
  dividendYield: string;
};

const DFMDividendPortfolioSchema: TableColumn<DFMDividendDataRow>[] = [
  {
    name: "Company Name",
    sortable: false,
    // width: "300px",
    selector: row => row.title
    // cell: RowComponent,
    // style: { border: "1px solid" }
  },
  {
    name: "Symbol",
    selector: row => row.symbol,
    center: true,
    compact: true,
    sortable: true
    // width: "70px"
    // style: { border: "1px solid" }
  },
  {
    name: "Market Price",
    selector: row => row.marketPrice,
    // compact: true,
    // width: "150px",
    sortable: true,
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "EPS",
    selector: row => row.earningPerShare,
    compact: true,
    // width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Annual Dividend",
    selector: row => row.dividendAmount,
    // compact: true,
    // width: "150px",
    sortable: true,
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Dividend Yield",
    selector: row => row.dividendYield,
    // compact: true,
    // width: "150px",
    sortable: true,
    center: true
    // style: { border: "1px solid" }
  }
];

const DFMDividendExpandableComponent: ({
  data
}: {
  data: DividendInformationDTO;
}) => JSX.Element = ({ data }) => {
  if (!data) {
    return null;
  }

  return <Code block>{JSON.stringify(data.AnnualDividends, null, 2)}</Code>;
};

export { DividendPortfolioSchema, DFMDividendPortfolioSchema, DFMDividendExpandableComponent };
