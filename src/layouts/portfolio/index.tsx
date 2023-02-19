import { FC, useState } from "react";
import cn from "classnames";
import useModal from "../../hooks/useModal";
import PortfolioOptions from "../../components/portfolio-options";
import PortfolioTable from "../../components/portfolio-table";
import AddAssetModal from "../../components/add-asset-modal";
import { getPortfolioTableSchema, AssetType } from "../../lib/portfolio-utils";

type PortfolioLayoutProps = {
  portfolioType: AssetType;
};

const dummyData = [
];

const PortfolioLayout: FC<PortfolioLayoutProps> = ({ portfolioType }) => {
  const { isShowing, toggle } = useModal(false);
  const [hide, setHide] = useState(false);
  const portfolioTableSchema = getPortfolioTableSchema(portfolioType);
  const onAssetAdd = asset => {
    dummyData.push(asset);
  };

  return (
    <>
      <AddAssetModal
        isShowing={isShowing}
        cancel={toggle}
        assetType={portfolioType}
        onSubmit={onAssetAdd}
      />
      <div className="overflow-y-autp flex w-full flex-1 flex-row rounded-t-lg border-2 border-red-300">
        <div
          className={cn("dashboard-primary-panel flex flex-col overflow-y-auto", {
            "sm:w-full": hide,
            "sm:w-8/12": !hide
          })}
        >
          <div className="flex h-20 flex-row border-2 border-red-300">
            <div className="flex h-full w-2/3 flex-col items-center p-2 md:flex-row md:justify-evenly md:p-4">
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
              <PortfolioOptions
                openAddAssetModal={toggle}
                togglePortfolioAnalysisPanel={() => setHide(!hide)}
              />
            </div>
          </div>
          {/* Occupy Max remaining space and scroll only table */}
          <div className="my-2 flex flex-1 overflow-auto border-2 border-red-300">
            <PortfolioTable
              tableSchema={portfolioTableSchema}
              data={dummyData}
              loading={undefined}
              expandableComponent={undefined}
            />
          </div>
        </div>
        <div
          className={cn(
            "dashboard-secondary-panel my-2 overflow-auto rounded-lg border-2 border-red-300",
            {
              "sm:hidden sm:max-w-0": hide
            }
          )}
        >
          Secondary Panel -LINK - {portfolioType}
        </div>
      </div>
    </>
  );
};

export default PortfolioLayout;
