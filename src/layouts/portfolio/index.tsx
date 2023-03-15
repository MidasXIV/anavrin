import { FC, useState, useRef, useEffect } from "react";
import cn from "classnames";
import NProgress from "nprogress";
import useModal from "../../hooks/useModal";
import PortfolioOptions from "../../components/portfolio-options";
import PortfolioTable from "../../components/portfolio-table";
import AddAssetModal from "../../components/add-asset-modal";
import {
  AssetType,
  getPortfolioExpandableComponent,
  getPortfolioRowDoubleClickHandler,
  getPortfolioSummary,
  getPortfolioTableSchema,
  updatePortfolio
} from "../../lib/portfolio-utils";
import { deleteUserPortfolio, saveUserPortfolio } from "../../util/user-portfolio";
import {
  convertCryptoPortfolioItemToPersistence,
  hydrateCryptoPortfolioItems
} from "../../lib/portfolio-asset-utils";
import EditAssetModal from "../../components/edit-asset-modal";
import PortfolioAnalysisHeader from "../../components/portfolio-analysis-header";

type PortfolioLayoutProps = {
  portfolio: Portfolio;
};

const PortfolioLayout: FC<PortfolioLayoutProps> = ({ portfolio }) => {
  // Extract the portfolioType and items.
  const { assetType: portfolioType } = portfolio;
  const [portfolioDomainObject, setPortfolioDomainObject] = useState<Portfolio>({
    assetType: "",
    items: []
  });
  const { isShowing, toggle } = useModal(false);
  const { isShowing: isEditModalShowing, toggle: toggleEditModal } = useModal(false);
  const [hide, setHide] = useState(true);
  const [portfolioData, setPortfolioData] = useState([]);

  const { totalInvested, portfolioValue, percentageChange } = getPortfolioSummary(portfolioData);

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
      const result = await saveUserPortfolio({
        ...portfolioDomainObject,
        assetType: portfolioType,
        items: portfolioData.map(item => convertCryptoPortfolioItemToPersistence(item))
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
      const result = await deleteUserPortfolio(portfolioDomainObject);

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

  const [height, setHeight] = useState(null);
  const tableRef = useRef(null);
  useEffect(() => {
    NProgress.start();
    if (tableRef.current) {
      setHeight(tableRef.current.getBoundingClientRect().height);
    }
    /**
     * Depending on the portfolio/asset Type hydrates data
     * such that it is understood by the tableSchema
     */
    async function hydratePortfolioItemsData() {
      const portfolioHydrationFnMapper = new Map();
      portfolioHydrationFnMapper.set(AssetType.CRYPTO, hydrateCryptoPortfolioItems);

      const data = await portfolioHydrationFnMapper.get(portfolioType)(portfolio);
      setPortfolioData(data);
      NProgress.done();
    }
    hydratePortfolioItemsData();

    setPortfolioDomainObject(portfolio);
  }, []);

  return (
    <>
      <AddAssetModal
        isShowing={isShowing}
        cancel={toggle}
        assetType={portfolioType}
        onSubmit={onAssetAdd}
      />
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
          className={cn("portfolio-default-primary-panel flex flex-col overflow-y-auto", {
            "sm:w-full": hide,
            "sm:w-8/12": !hide
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
                togglePortfolioAnalysisPanel={() => setHide(!hide)}
              />
            </div>
          </div>
          {/* Occupy Max remaining space and scroll only table */}
          <div className="mt-2 flex-1 overflow-y-auto" ref={tableRef} style={{ height }}>
            <PortfolioTable
              tableSchema={portfolioTableSchema}
              data={portfolioData}
              loading={undefined}
              expandableComponent={portfolioExpandableComponent}
              onRowDoubleclick={portfolioRowDoubleClickHandler}
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
