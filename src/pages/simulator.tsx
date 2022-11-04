import { FC, useEffect, useState } from "react";
import PortfolioTable from "../components/portfolio-table";
import useModal from "../hooks/useModal";
import DefaultLayout from "../layouts/default";
import { DFMDividendExpandableComponent, DFMDividendPortfolioSchema } from "../lib/table-schema";
import getStockInformation from "../util/getStockInformation";

const Portfolio: FC = () => {
  const { isShowing, toggle } = useModal(false);
  const [tableData, setTableData] = useState([]);
  const [dataBeingFetched, setDataBeingFetched] = useState(true);

  useEffect(() => {
    const DFMStocks = [
      // "OC",
      // "Emirates NBD",
      // "DIB",
      // "Airarabia",
      // "DIN",
      // "NGI",
      // "GFH",
      // "DNIR",
      // "AMANAT",
      // "CBD",
      // "DU",
      // "Orient",
      // "DRC",
      // "Tabreed",
      // "DFM",
      // "ALLIANCE",
      // "ASCANA",
      // "OIC",
      // "DIC",
      // "UFC",
      // "Mashreq",
      // "ALRAMZ",
      // "NCC",
      // "EMAAR",
      // "ARAMEX",
      // "SALAMA",
      // "NOORTAKAFULG",
      // "EIICAPITAL",
      // "NIND",
      // "AGILITY",
      // "NIH",
      "ENBD",
      "DEWA"
    ];
    setDataBeingFetched(true);

    const StockPromises = DFMStocks.map(ticker => getStockInformation(`${ticker}.AE`));

    Promise.allSettled(StockPromises)
      .then(
        results =>
          results.filter(result => result.status === "fulfilled") as PromiseFulfilledResult<any>[]
      )
      .then(results => results.map(result => result.value))
      .then(results => results.filter(result => result.status === 200))
      .then(results => results.map(result => result.data))
      .then(results => {
        // ToDomain domainMapper
        const data = results.map(result => ({
          title: result.name,
          marketPrice: result.price,
          ...result
        }));
        setTableData(data);
        setDataBeingFetched(false);
      });
  }, []);

  return (
    <>
      <DefaultLayout
        title="Simulator"
        sidebar="Simulator"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className="portfolio-primary-panel flex flex-col overflow-y-auto">
          {/* Occupy Max remaining space and scroll only table */}
          <div className="my-2 flex-1 overflow-auto">
            <PortfolioTable
              tableSchema={DFMDividendPortfolioSchema}
              data={tableData}
              loading={dataBeingFetched}
              expandableComponent={DFMDividendExpandableComponent}
            />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
