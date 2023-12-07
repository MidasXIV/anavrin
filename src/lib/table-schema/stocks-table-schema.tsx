import { Code } from "@mantine/core";
import { Media, TableColumn } from "react-data-table-component";
import BarChart from "../../components/charting/bar-chart/bar-chart";
import { valueFormatter } from "../../util/timeAndDateHelpers";

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
  cell?: () => void;
};

const StockPortfolioMarketValueComponent = (
  row: DividendDataRow,
  index: number,
  column: any,
  id: any
): JSX.Element => {
  const { marketValue, costBasis } = row;
  const change = Number.parseFloat(marketValue) - Number.parseFloat(costBasis);
  return (
    <div className="display: flex w-full space-x-2 px-2 text-xs" data-tag="allowRowEvents">
      <div className="w-1/2 text-right" data-tag="allowRowEvents">
        {valueFormatter(marketValue)}
      </div>
      <div className="w-1/2 text-left">
        <span
          className={`font-bold ${change >= 0 ? "text-green-500" : "text-red-500"}`}
          data-tag="allowRowEvents"
        >
          {change >= 0 ? "+" : "-"} {valueFormatter(Math.abs(change))}
        </span>
      </div>
    </div>
  );
};

const DividendPortfolioSchema: TableColumn<DividendDataRow>[] = [
  {
    name: "Company Name",
    sortable: false,
    width: "150px",
    selector: row => row.title,
    hide: Media.LG
    // cell: RowComponent,
    // style: { border: "1px solid" }
  },
  {
    name: "Symbol",
    selector: row => row.symbol,
    center: true,
    compact: true,
    sortable: true,
    grow: 1,
    width: "70px"
    // style: { border: "1px solid" }
  },
  // {
  //   name: "Sector",
  //   selector: row => row.sector,
  //   // compact: true,
  //   width: "120px",
  //   hide: Media.SM
  // },
  {
    name: "Price",
    selector: row => row.marketPrice,
    compact: true,
    grow: 1,
    // width: "70px",
    center: true
    // hide: Media.SM
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
    name: "Cost Basis",
    selector: row => row.costBasis,
    width: "100px",
    center: true,
    hide: Media.SM
    // compact: true,
    // style: { border: "1px solid" }
  },
  {
    name: "Market Value",
    selector: row => row.marketValue,
    compact: true,
    // width: "170px",
    grow: 2,
    center: true,
    // hide: Media.SM,
    cell: StockPortfolioMarketValueComponent
    // style: { border: "1px solid" }
  },
  {
    name: "Shares",
    selector: row => row.shares,
    grow: 1,
    compact: true,
    width: "70px",
    center: true
    // hide: Media.SM
    // style: { border: "1px solid" }
  },
  // {
  //   name: "Gain / Loss",
  //   selector: row => row.netValue,
  //   compact: true,
  //   width: "100px",
  //   center: true,
  //   hide: Media.SM
  // },
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

const StocksDividendExpandableComponent: ({
  data
}: {
  data: DividendInformationDTO;
}) => JSX.Element = ({ data }) => {
  if (!data) {
    return null;
  }
  console.log("Open");
  const chartDataMapper = chartData =>
    Object.keys(chartData).map(chartDataKey => ({
      year: chartDataKey,
      dividend: chartData[chartDataKey]
    }));
  return (
    <BarChart
      title="Dividend Payout"
      data={chartDataMapper(data.AnnualDividends)}
      categories={["dividend"]}
      index="year"
      colors={["blue"]}
    />
  );
};

const DFMDividendExpandableComponent: ({
  data
}: {
  data: DividendInformationDTO;
}) => JSX.Element = ({ data }) => {
  if (!data) {
    return null;
  }

  const chartDataMapper = chartData =>
    Object.keys(chartData).map(chartDataKey => ({
      year: chartDataKey,
      dividend: chartData[chartDataKey]
    }));
  return (
    <BarChart
      title="Dividend Payout"
      data={chartDataMapper(data.AnnualDividends)}
      categories={["dividend"]}
      index="year"
      colors={["blue"]}
    />
  );
};

const onDividendTableRowDoublceClick = parentComponentProps => {
  const { toggleEditModal, setAssetToBeEdited } = parentComponentProps;

  return (row, event) => {
    setAssetToBeEdited(row);
    toggleEditModal();
  };
};

export {
  StocksDividendExpandableComponent,
  DividendPortfolioSchema,
  DFMDividendPortfolioSchema,
  DFMDividendExpandableComponent,
  onDividendTableRowDoublceClick
};
