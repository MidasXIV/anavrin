import { FC } from "react";
import DataTable, { createTheme, TableColumn } from "react-data-table-component";
import {
  columnsDefault,
  dataStoreDefault,
  defaultExpandableComponent
} from "../../lib/table-schema";
import { removeObjFromArray } from "../../util/helper";
import DoubleClickButton from "../double-click-button";

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

type PortfolioTableProps<T> = {
  tableSchema: TableColumn<T>[];
  data: Array<any>;
  loading: boolean;
  expandableComponent: ({ data }: { data: any }) => JSX.Element;
  onRowDoubleclick?: (row, event) => void;
  showRowDeleteButton?: boolean;
  onRowDelete?: (updatedDatastore: Array<any>) => void;
};

const DeleteRowTableEntry = onClickHandler => ({
  button: true,
  width: "50px",
  cell: row => (
    <DoubleClickButton
      onClick={() => onClickHandler(row)}
      label={
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      }
      className="rounded p-1 font-bold text-white"
      activeClassName="bg-red-500 hover:bg-red-800"
      inactiveClassName="bg-charcoal-300 hover:bg-red-400"
      tooltipLabel="Click again to delete!"
    />
  )
});

const PortfolioTable: FC<PortfolioTableProps<any>> = ({
  tableSchema: columns = columnsDefault,
  data: dataStore = dataStoreDefault,
  loading = false,
  expandableComponent = defaultExpandableComponent,
  onRowDoubleclick,
  showRowDeleteButton,
  onRowDelete
}) => {
  const handleRowDelete = data => row => {
    onRowDelete(removeObjFromArray(data, row, "token"));
  };
  return (
    <DataTable
      title="Portfolio"
      columns={
        showRowDeleteButton
          ? [...columns, DeleteRowTableEntry(handleRowDelete(dataStore))]
          : columns
      }
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
      onRowDoubleClicked={onRowDoubleclick}
    />
  );
};
export default PortfolioTable;

PortfolioTable.defaultProps = {
  onRowDoubleclick: () => {
    console.warn("Double not supported");
  },
  onRowDelete: () => {
    console.warn("Delete not supported");
  },
  showRowDeleteButton: false
};
