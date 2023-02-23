import { FC, useState, useRef, useEffect } from "react";
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

  const [height, setHeight] = useState(null);
  const tableRef = useRef(null);
  useEffect(() => {
    if (tableRef.current) {
      debugger;
      setHeight(tableRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <AddAssetModal
        isShowing={isShowing}
        cancel={toggle}
        assetType={portfolioType}
        onSubmit={onAssetAdd}
      />
      <div className="flex h-full w-full flex-1 flex-row space-x-2 overflow-y-auto rounded-t-lg">
        <div
          className={cn("portfolio-default-primary-panel flex flex-col overflow-y-auto", {
            "sm:w-full": hide,
            "sm:w-8/12": !hide
          })}
          style={{ height: "100%" }}
        >
          <div className="flex h-20 flex-row">
            <div
              className="flex h-full w-2/3 flex-col items-center p-2 md:flex-row md:justify-evenly md:p-4"
              style={{ height: "100%" }}
            >
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
          <div className="mt-2 flex-1 overflow-y-auto" ref={tableRef} style={{ height }}>
            <PortfolioTable
              tableSchema={portfolioTableSchema}
              data={dummyData}
              loading={undefined}
              expandableComponent={undefined}
            />
          </div>
        </div>
        <div
          className={cn("portfolio-secondary-panel overflow-auto rounded-lg", {
            "sm:hidden sm:max-w-0": hide
          })}
        >
          <div>Secondary Panel -LINK - {portfolioType}</div>
        </div>
      </div>
    </>
  );
};

export default PortfolioLayout;
