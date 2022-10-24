import { FC } from "react";
import AddStockModal from "../components/add-stock-modal";
import PortfolioOptions from "../components/portfolio-options";
import PortfolioTable from "../components/portfolio-table";
import useModal from "../hooks/useModal";
import DefaultLayout from "../layouts/default";

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
        <div className="portfolio-primary-panel flex flex-col overflow-y-auto">
          <div className="flex h-20 flex-row">
            <div className="flex h-full w-2/3 flex-col items-center bg-red-100 p-2 md:flex-row md:justify-evenly md:p-4">
              <div className="flex w-full flex-col">
                <span className="m-1 hidden text-xs uppercase text-gray-700 md:block">
                  INVESTED AMOUNT
                </span>
                <div className="flex w-full items-end">
                  <span className="block text-xl leading-none text-gray-800 md:text-3xl">
                    22.325,50
                  </span>
                  {/* <span className="block leading-5 text-sm ml-4 text-green-500">
                    {" "}
                    {2.325 - 2.215 < 0 ? "▼" : "▲"} {(2.325 - 2.215).toFixed(3)}(
                    {((2.325 / 2.215) * 100 - 100).toFixed(3)} %)
                  </span> */}
                </div>
              </div>
              <div className="flex w-full flex-col md:flex-row md:justify-evenly">
                <div className="flex flex-row justify-between md:flex-col">
                  <span className="m-1 text-xs uppercase  text-gray-700">PROFIT</span>
                  <div className="flex md:w-full md:items-end">
                    <span className="m-1 block text-xs leading-none text-gray-800 md:m-0 md:text-3xl">
                      22.325,50
                    </span>
                  </div>
                </div>
                <div className="flex flex-row justify-between md:flex-col">
                  <span className="m-1 text-xs uppercase  text-gray-700">PORTFOLIO VALUE</span>
                  <div className="flex md:w-full md:items-end">
                    <span className="m-1 block text-xs leading-none text-gray-800 md:m-0 md:text-3xl">
                      22.325,50
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <PortfolioOptions openAddStockModal={toggle} />
            </div>
          </div>
          {/* Occupy Max remaining space and scroll only table */}
          <div className="my-2 flex-1 overflow-auto">
            <PortfolioTable />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
