import { FC, useCallback, useMemo, useState } from "react";
import DataTable, { createTheme, TableColumn } from "react-data-table-component";
import {
  columnsDefault,
  dataStoreDefault,
  defaultExpandableComponent
} from "../../lib/table-schema";
import { differenceBy } from "../../util/helper";

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
  onRowDoubleclick: (row, event) => void;
};

const PortfolioTable: FC<PortfolioTableProps<any>> = ({
  tableSchema: columns = columnsDefault,
  data: dataStore = dataStoreDefault,
  loading = false,
  expandableComponent = defaultExpandableComponent,
  onRowDoubleclick
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  // const [tableData, setTableData] = useState(dataStore);
  let tableData = dataStore;

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
        setToggleCleared(!toggleCleared);
        tableData = differenceBy(tableData, selectedRows, "title");
      }
    };

    return (
      <button
        type="button"
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
        // icon
      >
        Delete
      </button>
    );
  }, [tableData, selectedRows, toggleCleared]);

  return (
    <DataTable
      title="Portfolio"
      columns={columns}
      data={tableData}
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
      // actions={<TableAction />}
      // selectableRows
      // contextActions={contextActions}
      // onSelectedRowsChange={handleRowSelected}
      // clearSelectedRows={toggleCleared}
      onRowDoubleClicked={onRowDoubleclick}
    />
  );
};
export default PortfolioTable;
