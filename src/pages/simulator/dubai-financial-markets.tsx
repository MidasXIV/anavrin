import { FC, useEffect, useState } from "react";
import PortfolioTable from "../../components/portfolio-table";
import useModal from "../../hooks/useModal";
import DefaultLayout from "../../layouts/default";
import { DFMDividendExpandableComponent, DFMDividendPortfolioSchema } from "../../lib/table-schema";
import getStockInformation from "../../utils/getStockInformation";
import rateLimit from "../../lib/rate-limiting";

const SimulatorDFM: FC = () => {
  const { isShowing, toggle } = useModal(false);
  const [tableData, setTableData] = useState([]);
  const [dataBeingFetched, setDataBeingFetched] = useState(true);

  useEffect(() => {
    const DFMStocks = [
      // "OC",
      // "Orient",
      // "ALLIANCE",
      // "NOORTAKAFULG",
      // "EIICAPITAL",
      // "AGILITY",
      "DIB",
      "AIRARABIA",
      "DIN",
      "NGI",
      "GFH",
      "DNIR",
      "AMANAT",
      "CBD",
      "DU",
      "DRC",
      "TABREED",
      "DFM",
      "ASCANA",
      "OIC",
      "DIC",
      "UFC",
      "MASQ",
      "ALRAMZ",
      "NCC",
      "EMAAR",
      "ARMX",
      "SALAMA",
      "NIND",
      "NIH",
      "EMIRATESNBD",
      "DEWA"
    ];
    setDataBeingFetched(true);

    const StockPromises = DFMStocks.map(ticker =>
      rateLimit(() => getStockInformation(`${ticker}.AE`, false), 5)
    );

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
        sidebar="simulator"
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

export default SimulatorDFM;
