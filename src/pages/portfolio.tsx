import { FC } from "react";
import DataTable, { createTheme } from "react-data-table-component";
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
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 2,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 3,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 4,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 5,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 6,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 1,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 2,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 3,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 4,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 5,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  },
  {
    id: 6,
    title: "Conan the Barbarian",
    summary: "Orphaned boy Conan is enslaved after his village is destroyed...",
    year: "1982",
    image:
      "https://www.gannett-cdn.com/-mm-/b5b9a4be1001a8e21a47d04fce742aef4e4bcbe0/c=0-204-1978-1322/local/-/media/2018/05/23/USATODAY/USATODAY/636626722826639013-AP-People-Conan-O-Brien-85952068-1-.JPG?width=1978&height=1118&fit=crop&format=pjpg&auto=webp"
  }
];

const RowComponent = row => (
  <div>
    <div style={{ fontWeight: 700 }}>{row.title}</div>
    {row.summary}
  </div>
);
// The row data is composed into your custom expandable component via the data prop
const ExpandableComponent = ({ data }) => <img alt="" src={data.image} />;

const columns = [
  {
    name: "Title",
    sortable: true,
    cell: RowComponent
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
    right: true
  }
];

const Portfolio: FC = () => {
  // <div className="px-10 py-12 lg:px-56 flex justify-center">
  //   <Loading />
  // </div>
  return (
    <>
      <DefaultLayout
        title="Portfolio"
        sidebar="portfolio"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className="portfolio-primary-panel overflow-y-scroll">
          <DataTable
            title="Arnold Movies"
            columns={columns}
            data={dataStore}
            expandableRows
            expandableRowsComponent={<ExpandableComponent />}
            overflowY
            persistTableHead
            noHeader
            theme="solarized"
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
