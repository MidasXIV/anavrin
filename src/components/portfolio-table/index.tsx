import { FC } from "react";
import DataTable, { createTheme, TableColumn } from "react-data-table-component";
import {
  columnsDefault,
  dataStoreDefault,
  defaultExpandableComponent
} from "../../lib/table-schema";
import { removeObjFromArray } from "../../utils/helper";
import DoubleClickButton from "../double-click-button";
import CrossIconSVG from "../icons/crossIconSVG";

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
      marginBottom: "5px",
      size: "10px"
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
      label={<CrossIconSVG />}
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
    <div className="w-full">
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
    </div>
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
