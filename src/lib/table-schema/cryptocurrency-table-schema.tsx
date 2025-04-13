import { Media, TableColumn } from "react-data-table-component";
import DeleteIcon from "../../components/icons/deleteIcon";
import CryptocurrecnyTableDetailsViewProps from "../../components/cryptocurrecny-table-details-view/cryptocurrecny-table-details-view";

const globalDataBarStore = [];

type DataBar = {
  label: string; // e.g., Coin name
  value: number; // P/E value
};

// const data: DataBar[] = [
//   { label: "ETH", value: 520.6 },
//   { label: "FET", value: 106.32 },
//   { label: "MDT", value: -16.94 },
//   { label: "AR", value: -72.16 },
//   { label: "BOME", value: 150.23 }
//   // { label: "GRT", value: 156.02 }
//   // Add more data as needed...
// ];

const DataBars = ({ data, item }) => {
  // Calculate the min and max values
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  // Zero baseline as percentage of total range
  const zeroPosition = Math.abs(minValue / range) * 100;
  // Reference value for scaling (largest absolute value)
  const referenceValue = Math.max(Math.abs(maxValue), Math.abs(minValue));

  const percentage = (item.value / referenceValue) * 100; // Scaled percentage
  // const width = `${Math.abs(percentage) / 2}%`; // Absolute percentage for width
  const width = `${(Math.abs(item.value) / range) * 100}%`;
  // Bar color: Green for positive, Red for negative
  const barColor = item.value >= 0 ? "bg-green-500" : "bg-red-500";

  // p-4 w-full
  return (
    <div className="w-full">
      <div className="flex items-center">
        {/* Label */}
        {/* <div className="w-20 text-sm text-gray-700">{item.label}</div> */}

        {/* Bar container with padding */}
        <div className="relative h-6 flex-1 overflow-hidden rounded bg-gray-200 px-2">
          {/* Zero baseline */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-400" />

          {/* Bar */}
          {/* <div
            className={`${barColor} h-full`}
            style={{
              width,
              marginLeft: item.value < 0 ? `calc(50% - ${width})` : "50%"
            }}
            title={`${item.value}`} // Tooltip for value
          /> */}
          <div className="relative h-6 flex-1 rounded bg-gray-200">
            {/* Zero baseline */}
            <div
              className="absolute top-0 h-full w-0.5 bg-gray-400"
              style={{ left: `${zeroPosition}%` }}
            />

            {/* Bar */}
            <div
              className={`${barColor} h-full`}
              style={{
                width,
                marginLeft:
                  item.value < 0 ? `${zeroPosition - parseFloat(width)}%` : `${zeroPosition}%`
              }}
              title={`${item.value}`} // Tooltip for value
            />
          </div>
        </div>

        {/* Value */}
        <div className="absolute w-3/4 text-right">
          <span className="px-2 text-xs text-gray-800">{item.value} %</span>
        </div>
      </div>
    </div>
  );
};

type CryptoDataRow = {
  title: string;
  token: string;
  holdings: number;
  marketPrice: number;
  avgPrice: number; // holdings / initial investment
  fiat: number;
  pnl: number;
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

const CryptoPortfolioProfitOverEarningComponent = (
  row: CryptoDataRow,
  index: number,
  column: any,
  id: any
): JSX.Element => {
  const { title, marketValue, marketPrice, holdings, fiat, pnl } = row;
  // const value = parseFloat(marketValue.toFixed(2));
  // const PnL = parseFloat((value - fiat).toFixed(2));
  // const change = parseFloat((((value - fiat) / fiat) * 100).toFixed(3));

  const objItem = { label: title, value: pnl };
  if (
    globalDataBarStore.some(
      dataItem => dataItem.label === objItem.label && dataItem.value === objItem.value
    ) === false
  ) {
    globalDataBarStore.push(objItem);
  }
  const data = globalDataBarStore;

  return (
    <div className="display: flex w-full space-x-2 px-2" data-tag="allowRowEvents">
      <DataBars data={data} item={objItem} />
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
    <div className="flex w-full space-x-2 px-2" data-tag="allowRowEvents">
      <div className="w-1/2 text-right" data-tag="allowRowEvents">
        ${marketPrice.toFixed(3)}
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

const CryptoPortfolioHoldingsComponent = (
  row: CryptoDataRow,
  index: number,
  column: any,
  id: any
): JSX.Element => {
  const { holdings, fiat } = row;
  const costPerCoin = (fiat / holdings).toPrecision(3);
  return (
    <div className="display: flex w-full space-x-2 px-2" data-tag="allowRowEvents">
      <div className="w-1/2 text-right" data-tag="allowRowEvents">
        {holdings.toFixed(2)}
      </div>
      <div className="w-1/2 text-left">
        <span className="font-bold text-gray-400" data-tag="allowRowEvents">
          [{costPerCoin}]
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
    name: "Holdings [ APP ]",
    selector: row => row.holdings,
    // compact: true,
    // width: "150px",
    sortable: true,
    center: true,
    cell: CryptoPortfolioHoldingsComponent
    // style: { border: "1px solid" }
  },
  {
    name: "Fiat",
    selector: row => row.fiat,
    compact: true,
    // compact: true,
    // width: "150px",
    sortable: true,
    center: true,
    hide: Media.SM
    // style: { border: "1px solid" }
  },
  {
    name: "PnL",
    selector: row => row.pnl,
    // compact: true,
    grow: 1,
    // width: "70px",
    center: true,
    sortable: true,
    cell: CryptoPortfolioProfitOverEarningComponent
    // style: { border: "1px solid" }
  },
  {
    name: "Value",
    selector: row => row.marketValue,
    // compact: true,
    grow: 1,
    // width: "70px",
    center: true,
    sortable: true,
    cell: CryptoPortfolioValueComponent
    // style: { border: "1px solid" }
  }
];

const CryptocurrencyExpandableComponent: ({ data }) => JSX.Element = ({ data }) => (
  <CryptocurrecnyTableDetailsViewProps data={data} />
);

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
