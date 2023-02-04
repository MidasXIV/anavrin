import { Code } from "@mantine/core";
import Image from "next/image";
import cn from "classnames";
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

type CryptoDataRow = {
  title: string;
  symbol: string;
  holdings: string;
  marketPrice: string;
  avgPrice: string; // holdings / initial investment
  costBasis: string;
  marketValue: string; // holdings * marketPrice
  iconSrc: string;
  change: number;
  cell?: () => void;
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

const CryptoPortfolioAssetComponent = (row: CryptoDataRow, index: number, column: any, id: any) => (
  <div className="flex flex-row">
    <img
      className="mr-2 inline-flex h-5 w-5 rounded-full bg-gray-900"
      src={row.iconSrc}
      alt={row.title}
    />
    <h2 className="text-xs font-medium">{row.title}</h2>
  </div>
);

const CryptoPortfolioValueComponent = (row: CryptoDataRow, index: number, column: any, id: any) => {
  const value = (row.marketPrice * row.holdings).toFixed(2);
  const PnL = (value - row.costBasis).toFixed(2);
  return (
    <div className="display: flex w-full space-x-2 px-2">
      <div className="w-1/2 text-right">${value}</div>
      <div className="w-1/2 text-left">
        <span className={`font-bold ${PnL >= 0 ? "text-green-500" : "text-red-500"}`}>
          {PnL >= 0 ? "+" : "-"}
          {Math.abs(PnL)}
        </span>
      </div>
    </div>
  );
};

const CryptoPortfolioMarketPRiceComponent = (
  row: CryptoDataRow,
  index: number,
  column: any,
  id: any
) => (
  <div className="display: flex w-full space-x-2 px-2">
    <div className="w-1/2 text-right">${row.marketPrice}</div>
    <div className="w-1/2 text-left">
      <span className={`font-bold ${row.change >= 0 ? "text-green-500" : "text-red-500"}`}>
        {row.change >= 0 ? "+" : "-"}
        {Math.abs(row.change)}%
      </span>
    </div>
  </div>
);

const CryptoPortfolioSchema: TableColumn<CryptoDataRow>[] = [
  {
    name: "Asset",
    sortable: false,
    // width: "300px",
    selector: row => row.title,
    cell: CryptoPortfolioAssetComponent
    // style: { border: "1px solid" }
  },
  {
    name: "Price",
    selector: row => row.marketPrice,
    center: true,
    compact: true,
    sortable: true,
    // grow: 10,
    cell: CryptoPortfolioMarketPRiceComponent
    // width: "70px"
    // style: { border: "1px solid" }
  },
  {
    name: "Holdings",
    selector: row => row.holdings,
    // compact: true,
    // width: "150px",
    sortable: true,
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Value",
    selector: row => row.marketValue,
    compact: true,
    // width: "70px",
    center: true,
    cell: CryptoPortfolioValueComponent
    // style: { border: "1px solid" }
  }
];

export {
  DividendPortfolioSchema,
  DFMDividendPortfolioSchema,
  DFMDividendExpandableComponent,
  CryptoPortfolioSchema
};
