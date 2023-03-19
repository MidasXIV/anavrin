import { Media } from "react-data-table-component";

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

export { dataStoreDefault, defaultExpandableComponent, columnsDefault };
