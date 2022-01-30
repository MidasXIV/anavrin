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
        <div className="portfolio-primary-panel overflow-y-auto flex flex-col">
          <div className="h-20 flex flex-row">
            <div className="w-2/3 bg-red-100 h-full flex flex-col md:flex-row items-center p-2 md:p-4 md:justify-evenly">
              <div className="flex flex-col w-full">
                <span className="hidden md:block text-xs m-1 uppercase text-gray-700">
                  INVESTED AMOUNT
                </span>
                <div className="flex w-full items-end">
                  <span className="block leading-none text-xl md:text-3xl text-gray-800">
                    22.325,50
                  </span>
                  {/* <span className="block leading-5 text-sm ml-4 text-green-500">
                    {" "}
                    {2.325 - 2.215 < 0 ? "▼" : "▲"} {(2.325 - 2.215).toFixed(3)}(
                    {((2.325 / 2.215) * 100 - 100).toFixed(3)} %)
                  </span> */}
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row md:justify-evenly">
                <div className="flex flex-row md:flex-col justify-between">
                  <span className="text-xs m-1 uppercase  text-gray-700">PROFIT</span>
                  <div className="flex md:w-full md:items-end">
                    <span className="block leading-none text-xs md:text-3xl m-1 md:m-0 text-gray-800">
                      22.325,50
                    </span>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col justify-between">
                  <span className="text-xs m-1 uppercase  text-gray-700">PORTFOLIO VALUE</span>
                  <div className="flex md:w-full md:items-end">
                    <span className="block leading-none text-xs md:text-3xl m-1 md:m-0 text-gray-800">
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
          <div className="flex-1 overflow-auto my-2">
            <PortfolioTable />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
