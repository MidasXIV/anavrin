import { FC, useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import NProgress from "nprogress";
import { useResizeObserver } from "@mantine/hooks";
import { Drawer } from "vaul";
import { ScrollArea } from "@mantine/core";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  List,
  ListItem
} from "@tremor/react";
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
  convertDividendPortfolioItemToPersistence,
  hydrateCryptoPortfolioItems,
  hydrateDividendPortfolioItems
} from "../../lib/portfolio-asset-utils";
import EditAssetModal from "../../components/edit-asset-modal";
import PortfolioAnalysisHeader from "../../components/portfolio-analysis-header";
import RingChart from "../../components/charting/ring-chart/ring-chart";
import api from "../../services/create-service";
import { valueFormatter } from "../../util/timeAndDateHelpers";
import InfoIcon from "../../components/icons/InfoIcon";
import BarChartWrapper from "../../components/charting/bar-chart/bar-chart";

type PortfolioLayoutProps = {
  portfolio: Portfolio;
};

const portfolioHydrationFnMapper = new Map<
  AssetType,
  (portfolio: Portfolio) => Promise<unknown[]>
>();
portfolioHydrationFnMapper.set(AssetType.CRYPTO, hydrateCryptoPortfolioItems);
portfolioHydrationFnMapper.set(AssetType.STOCK, hydrateDividendPortfolioItems);

const portfolioSaveFnMapper = new Map<AssetType, (portfolioItem) => Promise<PortfolioItem[]>>();

portfolioSaveFnMapper.set(AssetType.CRYPTO, data =>
  data.map(item => convertCryptoPortfolioItemToPersistence(item))
);
portfolioSaveFnMapper.set(AssetType.STOCK, data =>
  data.map(item => convertDividendPortfolioItemToPersistence(item))
);

const Card = ({
  showHeader = false,
  header = "Header",
  showFooter = false,
  children,
  customFooter = false,
  footer = null
}) => (
  <div className="flex h-full w-full flex-col rounded-lg bg-gray-100">
    {showHeader ? (
      <div className="border-success dark:border-success-300 inline-flex justify-between border-b-2 px-3 pb-1 pt-2 text-xs text-neutral-600 dark:text-neutral-50">
        <span>{header}</span>
        <button type="button" className="hover:bg-gray-200">
          <InfoIcon />
        </button>
      </div>
    ) : null}
    <div className="flex-1 overflow-hidden">{children}</div>
    {showFooter ? (
      <div className="border-success dark:border-success-300 border-t-2 text-neutral-600 dark:text-neutral-50">
        {customFooter ? footer : <span className="px-3 py-2 text-xs">Footer</span>}
      </div>
    ) : null}
  </div>
);

const mockDividendDistributionData = {
  January: [
    {
      symbol: "AAPL",
      dividendAmount: 12.34
    },
    {
      symbol: "UNP",
      dividendAmount: 45.34
    }
  ],
  February: [
    {
      symbol: "AAPL",
      dividendAmount: 12.34
    }
  ],
  March: [
    {
      symbol: "AAPL",
      dividendAmount: 12.34
    }
  ],
  April: [],
  May: [
    {
      symbol: "AAPL",
      dividendAmount: 12.34
    }
  ],
  June: [],
  July: [
    {
      symbol: "AAPL",
      dividendAmount: 12.34
    }
  ],
  August: [],
  September: [
    {
      symbol: "AAPL",
      dividendAmount: 12.34
    }
  ],
  October: [],
  November: [
    {
      symbol: "AAPL",
      dividendAmount: 12.34
    },
    {
      symbol: "UNP",
      dividendAmount: 45.34
    },
    {
      symbol: "UNP",
      dividendAmount: 45.34
    }
  ],
  December: [
    {
      symbol: "UNP",
      dividendAmount: 45.34
    }
  ]
};

const DividendDistributionBlock = ({ month, distribution }) => (
  <div className="space-y-2 rounded-md bg-gray-100 p-2 text-xs">
    <span>{month}</span>
    {/* <List>
      {distribution.map(item => (
        <ListItem className="text-xs" key={item.symbol}>
          <span>{item.symbol}</span>
          <span>{valueFormatter(item.dividendAmount)}</span>
        </ListItem>
      ))}
    </List> */}
    <div className="flex flex-col text-xs">
      <ScrollArea h={75} offsetScrollbars scrollbarSize={4}>
        {distribution.map((item, index) => (
          <div
            key={`distribution-data-item-${index + 1}`}
            className="border-1 flex w-full justify-between border-b border-gray-300 py-1"
          >
            <div className="inline-flex">
              <span className="font-medium text-gray-800">{item.symbol}</span>
            </div>

            <span className="text-gray-500">{valueFormatter(item.dividendAmount)}</span>
          </div>
        ))}
        {distribution.length < 1 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No dividends</p>
          </div>
        ) : null}
      </ScrollArea>
    </div>
  </div>
);

const PortfolioLayoutSecondaryPanel = ({
  portfolioType,
  ringChartData,
  dividendIncome,
  portfolioDividendYield,
  portfolioDividendEfficiency
}) => {
  const ad = 3 + 5;
  return (
    <>
      {/* <div>Secondary Panel -LINK - {portfolioType}</div> */}
      <section className="flex h-full max-h-72 w-full flex-row border-2 border-red-300">
        <div className="h-full w-full border-2 border-red-300 p-1">
          <Card showHeader header="Dividend analysis">
            <div className="flex h-full w-full flex-col">
              <div className="h-full w-full p-1 px-2">
                <span className="font-sans text-3xl font-bold text-gray-900">
                  {valueFormatter(dividendIncome)}
                </span>
              </div>
              <div className="flex h-full w-full flex-row">
                <div className="border-1 border-success flex h-full w-full flex-col justify-between border-r-2 border-t-2 p-1 px-2">
                  <div className="font-sans text-2xl font-bold text-gray-900">
                    {portfolioDividendYield}%
                  </div>
                  <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                    <span>Dividend yield</span>
                    <button type="button" className="hover:bg-gray-200">
                      <InfoIcon />
                    </button>
                  </div>
                </div>
                <div className="border-1 border-success flex h-full w-full flex-col justify-between border-t-2 p-1 px-2">
                  <div className="font-sans text-2xl font-bold text-gray-900">
                    {portfolioDividendEfficiency}%
                  </div>
                  <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                    <span>Dividend efficiency</span>
                    <button type="button" className="hover:bg-gray-200">
                      <InfoIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="h-full w-full border-2 border-red-300 p-1">
          <Card showHeader header="Portfolio breakdown">
            <div className="px-10">
              <RingChart sections={ringChartData} />
            </div>
            <div className="flex flex-col text-xs">
              <ScrollArea h={75} offsetScrollbars scrollbarSize={4}>
                {ringChartData.map((ringChartDataItem, index) => (
                  <div
                    key={`ring-chart-data-item-${index + 1}`}
                    className="border-1 flex w-full justify-between border-b border-gray-300 px-2 py-1"
                  >
                    <div className="inline-flex w-1/3">
                      <div className="h-4 w-4 rounded-full bg-indigo-700 leading-none" />
                      <span className="ml-2 font-bold text-gray-800">
                        {ringChartDataItem.tooltip}
                      </span>
                    </div>

                    <span className="w-1/3 text-left font-medium text-gray-500">
                      {valueFormatter(ringChartDataItem.value)}
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-tiny leading-none text-red-100">
                      {ringChartDataItem.composition} %
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </Card>
        </div>
      </section>
      <section className="flex w-full flex-row border-2 border-red-300">
        <div className="h-full w-full border-2 border-red-300 p-1">
          <Card
            showHeader
            showFooter
            customFooter
            header="Dividend distribution"
            footer={
              <AccordionList className=" bg-gray-100 bg-transparent text-xs">
                <Accordion>
                  <AccordionHeader>view more</AccordionHeader>
                  <AccordionBody className="text-xs">
                    <section className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {Object.keys(mockDividendDistributionData).map(key => (
                          <DividendDistributionBlock
                            key={key}
                            month={key}
                            distribution={mockDividendDistributionData[key]}
                          />
                        ))}
                      </div>
                    </section>
                  </AccordionBody>
                </Accordion>
              </AccordionList>
            }
          >
            {/* bar chartt */}
            <div className="h-44 w-full p-2">
              <BarChartWrapper
                title="Dividends in year"
                data={[
                  {
                    month: "January",
                    dividends: 300
                  },
                  {
                    month: "February",
                    dividends: 600
                  },
                  {
                    month: "March",
                    dividends: 400
                  },
                  {
                    month: "April",
                    dividends: 400
                  },
                  {
                    month: "May",
                    dividends: 400
                  },
                  {
                    month: "June",
                    dividends: 800
                  },
                  {
                    month: "July",
                    dividends: 400
                  },
                  {
                    month: "August",
                    dividends: 500
                  },
                  {
                    month: "September",
                    dividends: 600
                  },
                  {
                    month: "October",
                    dividends: 100
                  },
                  {
                    month: "November",
                    dividends: 200
                  },
                  {
                    month: "December",
                    dividends: 250
                  }
                ]}
                index="month"
                categories={["dividends"]}
                colors={["blue"]}
              />
            </div>
          </Card>
        </div>
      </section>
    </>
  );
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

  const {
    totalInvested,
    portfolioValue,
    percentageChange,
    ringChartData,
    dividendIncome,
    portfolioDividendYield,
    portfolioDividendEfficiency
  } = getPortfolioSummaryMemoized(portfolioData, portfolioType);

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
      const portfolioItems = await portfolioSaveFnMapper.get(portfolioType)(portfolioData);

      const result = await api.saveUserPortfolio({
        portfolio: {
          ...portfolioDomainObject,
          assetType: portfolioType,
          items: portfolioItems
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
