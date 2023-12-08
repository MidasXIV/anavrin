import { FC, useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import NProgress from "nprogress";
import { useResizeObserver } from "@mantine/hooks";
import useModal from "../../hooks/useModal";
import PortfolioOptions from "../../components/portfolio-options";
import PortfolioTable from "../../components/portfolio-table";
import AddAssetModal from "../../components/add-asset-modal";
import {
  AssetType,
  getPortfolioExpandableComponent,
  getPortfolioRowDoubleClickHandler,
  getPortfolioSummaryMemoized,
  getPortfolioTableSchema,
  updatePortfolio
} from "../../lib/portfolio-utils";
import {
  convertCryptoPortfolioItemToPersistence,
  hydrateCryptoPortfolioItems
} from "../../lib/portfolio-asset-utils";
import EditAssetModal from "../../components/edit-asset-modal";
import PortfolioAnalysisHeader from "../../components/portfolio-analysis-header";
import RingChart from "../../components/ring-chart/ring-chart";
import api from "../../services/create-service";

type PortfolioLayoutProps = {
  portfolio: Portfolio;
};

const PortfolioLayout: FC<PortfolioLayoutProps> = ({ portfolio }) => {
  const [ref, size] = useResizeObserver();

  // Extract the portfolioType and items.
  const { assetType: portfolioType } = portfolio;
  const [portfolioDomainObject, setPortfolioDomainObject] = useState<Portfolio>({
    assetType: "",
    items: []
  });
  const { isShowing, toggle } = useModal(false);
  const { isShowing: isEditModalShowing, toggle: toggleEditModal } = useModal(false);
  const [hideSecondaryPanel, setHideSecondaryPanel] = useState(true);
  const [portfolioData, setPortfolioData] = useState([]);
  const [portfolioTableLoading, setPortfolioTableLoading] = useState(false);

  const { totalInvested, portfolioValue, percentageChange, ringChartData } =
    getPortfolioSummaryMemoized(portfolioData);

  const [assetToBeEdited, setAssetToBeEdited] = useState(undefined);

  const portfolioTableSchema = getPortfolioTableSchema(portfolioType);
  const portfolioExpandableComponent = getPortfolioExpandableComponent(portfolioType);
  const portfolioRowDoubleClickHandler = getPortfolioRowDoubleClickHandler(portfolioType, {
    toggleEditModal,
    setAssetToBeEdited
  });

  const onAssetAdd = asset => {
    portfolioData.push(asset);
  };

  const onAssetEdit = asset => {
    const updatedPortfolioData = updatePortfolio(portfolioData, asset, "token");
    setPortfolioData(updatedPortfolioData);
  };

  const onPortfolioSave = async () => {
    try {
      NProgress.start();

      console.log("Saving portfolio");
      const result = await api.saveUserPortfolio({
        portfolio: {
          ...portfolioDomainObject,
          assetType: portfolioType,
          items: portfolioData.map(item => convertCryptoPortfolioItemToPersistence(item))
        }
      });

      const { data } = result;
      setPortfolioDomainObject(data.value);
      console.log(data);
      // Success handling here
    } catch (error) {
      // Error handling here
      console.error(error);

      if (error.response) {
        // Handle known error types returned by the API
        const { data } = error.response;
        switch (data.type) {
          case "UserNotLoggedIn":
            // Handle the "UserNotLoggedIn" error
            break;
          case "MaxPortfoliosReached":
            // Handle the "MaxPortfoliosReached" error
            break;
          case "FailedToUpdatePortfolio":
            // Handle the "FailedToUpdatePortfolio" error
            break;
          default:
            // Handle other known errors returned by the API
            break;
        }
      } else if (error.request) {
        // Handle network errors (e.g. server not responding)
        console.log("Server not responding");
      } else {
        // Handle other types of errors (e.g. unexpected errors)
        console.log("Unexpected error occurred");
      }
    } finally {
      NProgress.done();
    }
  };

  const onPortfolioDelete = async () => {
    try {
      NProgress.start();
      console.log("Deleting portfolio");
      const result = await api.deleteUserPortfolio({ portfolio: portfolioDomainObject });

      const { data } = result;
      console.log(data);
      // Success handling here
    } catch (error) {
      // Error handling here
      console.error(error);

      if (error.response) {
        // Handle known error types returned by the API
        const { data } = error.response;
        switch (data.type) {
          case "UserNotLoggedIn":
            // Handle the "UserNotLoggedIn" error
            break;
          case "NoMatchingPortfolio":
            // Handle the "NoMatchingPortfolio" error
            break;
          case "FailedToDeletePortfolio":
            // Handle the "FailedToUpdatePortfolio" error
            break;
          default:
            // Handle other known errors returned by the API
            break;
        }
      } else if (error.request) {
        // Handle network errors (e.g. server not responding)
        console.log("Server not responding");
      } else {
        // Handle other types of errors (e.g. unexpected errors)
        console.log("Unexpected error occurred");
      }
    } finally {
      NProgress.done();
    }
  };

  const onPortfolioRowDelete = async updatedPortfolio => {
    setPortfolioData(updatedPortfolio);
  };

  const [height, setHeight] = useState(null);
  const tableRef = useRef(null);
  useEffect(() => {
    console.log("useEffect layouts/portfolio");
    NProgress.start();
    if (tableRef.current) {
      setHeight(tableRef.current.getBoundingClientRect().height);
    }
    /**
     * Depending on the portfolio/asset Type hydrates data
     * such that it is understood by the tableSchema
     */
    async function hydratePortfolioItemsData() {
      const data = await portfolioHydrationFnMapper.get(portfolioType)(portfolio);
      setPortfolioData(data);
      setPortfolioTableLoading(false);
      NProgress.done();
    }
    setPortfolioTableLoading(true);
    hydratePortfolioItemsData();

    setPortfolioDomainObject(portfolio);
  }, [portfolio]);

  console.log("layouts/Portfolio -> render");
  return (
    <>
      <Drawer.Root>
        {isShowing ? (
          <AddAssetModal
            isShowing={isShowing}
            cancel={toggle}
            assetType={portfolioType}
            onSubmit={onAssetAdd}
          />
        ) : null}
        {assetToBeEdited ? (
          <EditAssetModal
            isShowing={isEditModalShowing}
            cancel={toggleEditModal}
            assetType={portfolioType}
            onSubmit={onAssetEdit}
            asset={assetToBeEdited}
          />
        ) : null}
        <div className="flex h-full w-full flex-1 flex-row space-x-2 overflow-y-auto rounded-t-lg">
          <div
            className={clsx("portfolio-default-primary-panel flex flex-col overflow-y-auto", {
              "sm:w-full": hideSecondaryPanel,
              "sm:w-8/12": !hideSecondaryPanel
            })}
            style={{ height: "100%" }}
          >
            <div className="flex h-20 flex-row">
              <PortfolioAnalysisHeader
                totalInvested={totalInvested}
                portfolioValue={portfolioValue}
                percentageChange={percentageChange}
              />
              <div className="w-1/3">
                <PortfolioOptions
                  openAddAssetModal={toggle}
                  savePortfolio={onPortfolioSave}
                  deletePortfolio={onPortfolioDelete}
                  togglePortfolioAnalysisPanel={() => setHideSecondaryPanel(!hideSecondaryPanel)}
                />
              </div>
            </div>
            {/* Occupy Max remaining space and scroll only table */}
            <div className="mt-2 flex-1 overflow-y-auto" ref={tableRef} style={{ height }}>
              <PortfolioTable
                tableSchema={portfolioTableSchema}
                data={portfolioData}
                loading={portfolioTableLoading}
                expandableComponent={portfolioExpandableComponent}
                onRowDoubleclick={portfolioRowDoubleClickHandler}
                showRowDeleteButton
                onRowDelete={onPortfolioRowDelete}
              />
            </div>
          </div>
          <div
            className={clsx("portfolio-secondary-panel overflow-auto rounded-lg", {
              "sm:hidden sm:max-w-0": hideSecondaryPanel
            })}
            ref={ref}
          >
            {hideSecondaryPanel ? null : (
              <>
                <PortfolioLayoutSecondaryPanel
                  portfolioType={portfolioType}
                  ringChartData={ringChartData}
                  dividendIncome={dividendIncome}
                  portfolioDividendYield={portfolioDividendYield}
                  portfolioDividendEfficiency={portfolioDividendEfficiency}
                />
                {/* <span className="text-md mx-auto w-full text-center font-mono text-black md:hidden">
                  <Drawer.Trigger>click to open</Drawer.Trigger>
                </span> */}
              </>
            )}
          </div>
        </div>
      </Drawer.Root>
    </>
  );
};
export default PortfolioLayout;
