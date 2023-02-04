import { FC } from "react";
import DataTable, {
  createTheme,
  defaultThemes,
  Media,
  TableColumn
} from "react-data-table-component";

createTheme("solarized", {
  text: {
    primary: "#3d4551",
    secondary: "#2aa198"
  },
  background: {
    default: "transparent"
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF"
  },
  divider: {
    default: "#c9c9c9"
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)"
  }
});

const dataStoreDefault = [
  {
    id: 1,
    title: "Apple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 2,
    title: "Apple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 3,
    title: "Apple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 4,
    title: "Apple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 5,
    title: "Apple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 6,
    title: "Apple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 7,
    title: "Apple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 8,
    title: "ACpple Inc.",
    sector: "Technology",
    symbol: "APPL",
    marketPrice: "110.24",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  }
];

const RowComponent = row => (
  <div>
    <div style={{ fontWeight: 700 }}>{row.title}</div>
    {/* {row.summary} */}
  </div>
);
// The row data is composed into your custom expandable component via the data prop
const defaultExpandableComponent = ({ data }) => {
  if (!data) {
    return null;
  }
  return <img alt="" width="200px" src={data.image} />;
};

const columnsDefault = [
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
    selector: row => row.dividend,
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

const customStyles = {
  header: {
    style: {
      minHeight: "56px"
    }
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default
    }
  },
  rows: {
    style: {
      minHeight: "72px" // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px"
    }
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px"
    }
  },
  contextMenu: {
    style: {}
  }
};

const customStyles2 = {
  header: {
    style: {
      backgroundColor: "#FFFFFF",
      minHeight: "56px"
    }
  },
  headRow: {
    style: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "5px",
      // outline: "1px solid #FFFFFF",
      //   borderTopStyle: "solid",
      //   borderTopWidth: "1px",
      //   borderTopColor: defaultThemes.default.divider.default
      marginBottom: "5px"
    }
  },
  // headCells: {
  // style: {
  //   "&:not(:last-of-type)": {
  //     borderRightStyle: "solid",
  //     borderRightWidth: "1px",
  //     borderRightColor: defaultThemes.default.divider.default
  //   }
  // }
  // },
  rows: {
    style: {
      minHeight: "36px",
      backgroundColor: "rgba(230, 244, 244, 0)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "5px",
      // outline: "1px solid #FFFFFF",
      marginBottom: "5px"
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244, 0.5)",
      // borderBottomColor: "#FFFFFF",
      borderRadius: "5px"
      // outline: "1px solid #FFFFFF"
    }
  }
  // cells: {
  // style: {
  //   "&:not(:last-of-type)": {
  //     borderRightStyle: "solid",
  //     borderRightWidth: "1px",
  //     borderRightColor: defaultThemes.default.divider.default
  //   }
  // }
  // }
};

const TableAction = data => {
  console.log(data);
  return (
    <div>
      <div style={{ fontWeight: 700 }}>Hello</div>
    </div>
  );
};

type PortfolioTableProps<T> = {
  tableSchema: TableColumn<T>[];
  data: Array<any>;
  loading: boolean;
  expandableComponent: ({ data }: { data: any }) => JSX.Element;
};

const PortfolioTable: FC<PortfolioTableProps<any>> = ({
  tableSchema: columns = columnsDefault,
  data: dataStore = dataStoreDefault,
  loading = false,
  expandableComponent = defaultExpandableComponent
}) => (
  <DataTable
    title="Portfolio"
    columns={columns}
    data={dataStore}
    expandableRows
    expandableRowsComponent={expandableComponent}
    expandOnRowClicked
    expandableRowsHideExpander
    // overflowY
    persistTableHead
    responsive
    fixedHeader
    fixedHeaderScrollHeight="100%"
    noHeader
    progressPending={loading}
    theme="solarized"
    customStyles={customStyles2}
    highlightOnHover
    pointerOnHover
    // progressPending
    actions={<TableAction />}
  />
);

export default PortfolioTable;
