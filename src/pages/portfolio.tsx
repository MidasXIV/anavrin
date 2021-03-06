import { FC } from "react";
import DataTable, { createTheme, defaultThemes } from "react-data-table-component";
import AddStockModal from "../components/add-stock-modal";
import PortfolioOptions from "../components/portfolio-options";
import useModal from "../hooks/useModal";
import DefaultLayout from "../layouts/default";

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

const dataStore = [
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
const ExpandableComponent = ({ data }) => {
  if (!data) {
    return null;
  }
  return <img alt="" width="200px" src={data.image} />;
};

const columns = [
  {
    name: "Company Name",
    sortable: false,
    width: "150px",
    selector: "title"
    // cell: RowComponent,
    // style: { border: "1px solid" }
  },
  {
    name: "Symbol",
    selector: "symbol",
    center: true,
    compact: true,
    sortable: true,
    width: "70px"
    // style: { border: "1px solid" }
  },
  {
    name: "Sector",
    selector: "sector",
    // compact: true,
    width: "120px"
    // style: { border: "1px solid" }
  },
  {
    name: "Shares",
    selector: "shares",
    compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Average Price",
    selector: "avgPrice",
    // compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Market Price",
    selector: "marketPrice",
    // compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Cost Basis",
    selector: "costBasis",
    width: "70px",
    center: true
    // compact: true,
    // style: { border: "1px solid" }
  },
  {
    name: "Market Value",
    selector: "marketValue",
    // compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Gain / Loss",
    selector: "netValue",
    compact: true,
    width: "100px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "EPS",
    selector: "earningPerShare",
    compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "P/E",
    selector: "pricePerEarning",
    compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Annual Dividend",
    selector: "dividend",
    // compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Dividend Yield",
    selector: "dividendYield",
    // compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Yield on Cost",
    selector: "yieldOnCost",
    // compact: true,
    width: "70px",
    center: true
    // style: { border: "1px solid" }
  },
  {
    name: "Annual Income",
    selector: "income",
    // compact: true,
    width: "70px",
    center: true
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
      minHeight: "56px"
    }
  },
  headRow: {
    style: {
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
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "5px",
      // outline: "1px solid #FFFFFF",
      marginBottom: "5px"
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "5px",
      outline: "1px solid #FFFFFF"
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
  return (
    <div>
      <div style={{ fontWeight: 700 }}>Hello</div>
    </div>
  );
};

const Portfolio: FC = () => {
  const { isShowing, toggle } = useModal(false);
  return (
    <>
      <DefaultLayout
        title="Portfolio"
        sidebar="portfolio"
        description="You can see your portfolios estimated value & progress below"
      >
        <AddStockModal isShowing={isShowing} cancel={toggle} />
        <div className="portfolio-primary-panel overflow-y-hidden">
          <div className="h-20 flex flex-row">
            <div className="w-2/3 bg-red-100 h-full flex items-center p-4 justify-between">
              <div className="flex flex-col">
                <span className="text-xs m-1 uppercase  text-gray-700">INVESTED AMOUNT</span>
                <div className="flex w-full items-end">
                  <span className="block leading-none text-3xl text-gray-800">22.325,50</span>
                  {/* <span className="block leading-5 text-sm ml-4 text-green-500">
                    {" "}
                    {2.325 - 2.215 < 0 ? "▼" : "▲"} {(2.325 - 2.215).toFixed(3)}(
                    {((2.325 / 2.215) * 100 - 100).toFixed(3)} %)
                  </span> */}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs m-1 uppercase  text-gray-700">PROFIT</span>
                <div className="flex w-full items-end">
                  <span className="block leading-none text-3xl text-gray-800">22.325,50</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs m-1 uppercase  text-gray-700">PORTFOLIO VALUE</span>
                <div className="flex w-full items-end">
                  <span className="block leading-none text-3xl text-gray-800">22.325,50</span>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <PortfolioOptions openAddStockModal={toggle} />
            </div>
          </div>
          <DataTable
            title="Portfolio"
            columns={columns}
            data={dataStore}
            expandableRows
            expandableRowsComponent={<ExpandableComponent data={null} />}
            overflowY
            persistTableHead
            fixedHeader
            noHeader
            theme="solarized"
            customStyles={customStyles2}
            highlightOnHover
            pointerOnHover
            actions={<TableAction />}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
