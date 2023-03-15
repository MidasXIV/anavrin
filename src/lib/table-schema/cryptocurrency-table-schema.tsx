import { Code } from "@mantine/core";
import { TableColumn } from "react-data-table-component";

type CryptoDataRow = {
  title: string;
  token: string;
  holdings: number;
  marketPrice: number;
  avgPrice: number; // holdings / initial investment
  fiat: number;
  marketValue: number; // holdings * marketPrice
  iconSrc: string;
  change: number;
  cell?: () => void;
};

const CryptoPortfolioAssetComponent = (
  row: CryptoDataRow,
  index: number,
  column: any,
  id: any
): JSX.Element => {
  const { iconSrc, title } = row;
  return (
    <div className="flex flex-row">
      <img
        className="mr-2 inline-flex h-5 w-5 rounded-full bg-gray-900"
        src={iconSrc}
        alt={title}
      />
      <h2 className="text-xs font-medium">{title}</h2>
    </div>
  );
};

const CryptoPortfolioValueComponent = (
  row: CryptoDataRow,
  index: number,
  column: any,
  id: any
): JSX.Element => {
  const { marketValue, marketPrice, holdings, fiat } = row;
  const value = parseFloat(marketValue.toFixed(2));
  const PnL = parseFloat((value - fiat).toFixed(2));
  return (
    <div className="display: flex w-full space-x-2 px-2" data-tag="allowRowEvents">
      <div className="w-1/2 text-right" data-tag="allowRowEvents">
        ${value}
      </div>
      <div className="w-1/2 text-left" data-tag="allowRowEvents">
        <span className={`font-bold ${PnL >= 0 ? "text-green-500" : "text-red-500"}`}>
          {PnL >= 0 ? "+" : "-"}
          {Math.abs(PnL)}
        </span>
      </div>
    </div>
  );
};

const CryptoPortfolioMarketPriceComponent = (
  row: CryptoDataRow,
  index: number,
  column: any,
  id: any
): JSX.Element => {
  const { marketPrice, change } = row;
  return (
    <div className="display: flex w-full space-x-2 px-2" data-tag="allowRowEvents">
      <div className="w-1/2 text-right" data-tag="allowRowEvents">
        ${marketPrice}
      </div>
      <div className="w-1/2 text-left">
        <span
          className={`font-bold ${change >= 0 ? "text-green-500" : "text-red-500"}`}
          data-tag="allowRowEvents"
        >
          {change >= 0 ? "+" : "-"}
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};

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
    cell: CryptoPortfolioMarketPriceComponent
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
    sortable: true,
    cell: CryptoPortfolioValueComponent
    // style: { border: "1px solid" }
  }
];

const CryptocurrencyExpandableComponent: ({ data }) => JSX.Element = ({ data }) => {
  if (!data) {
    return null;
  }

  return <Code block>{JSON.stringify(data, null, 2)}</Code>;
};

const onCryptocurrencyTableRowDoublceClick = parentComponentProps => {
  const { toggleEditModal, setAssetToBeEdited } = parentComponentProps;

  return (row, event) => {
    setAssetToBeEdited(row);
    toggleEditModal();
  };
};

export {
  CryptoPortfolioSchema,
  CryptocurrencyExpandableComponent,
  onCryptocurrencyTableRowDoublceClick
};
