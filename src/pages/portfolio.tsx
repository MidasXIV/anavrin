import { Tabs } from "@mantine/core";
import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import AddNewPortfolioModal from "../components/add-new-portfolio-modal";
import LoadingForm from "../components/exchanges-form/loading";
import PlusIconSVG from "../components/icons/plusIconSVG";
import MaxPortfolioReachedModal from "../components/max-portfolio-reached-modal";
import useModal from "../hooks/useModal";
import DefaultLayout from "../layouts/default";
import { AssetType } from "../lib/portfolio-utils";
import api from "../services/create-service";

const LazyLoadPortfolio = dynamic(() => import("../layouts/portfolio"), {
  loading: LoadingForm,
  ssr: false
});

const ADD_PORTFOLIO_TAB_VALUE = "add-portfolio";
const generateTabsValueForPortfolioItem = portfolio => `Portfolio::${portfolio._id}`;

const Portfolio: FC = () => {
  const { isShowing: showCreatePortfolioModal, toggle: toggleShowCreatePortfolioModal } =
    useModal(false);
  const { isShowing: showMaxPortfolioWarningModal, toggle: toggleShowMaxPortfolioWarningModal } =
    useModal(false);

  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);

  const portfolioCount = portfolios.length;
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

  const [activeTab, setActiveTab] = useState(null);
  const handleAssetTypeSelection = (assetType: AssetType) => {
    toggleShowCreatePortfolioModal();
    portfolios.push({
      assetType,
      items: []
    });
  };

  const handleTabChange = (tabValue: string) => {
    const PORTFOLIO_LIMIT = 2;

    // If tabIndex is last tab => it is add portfolio button
    // tabIndex starts from 0 hence such a check
    if (tabValue === ADD_PORTFOLIO_TAB_VALUE) {
      if (portfolioCount >= PORTFOLIO_LIMIT) {
        toggleShowMaxPortfolioWarningModal();
        console.log("Max Portfolios created");
        return;
      }
      toggleShowCreatePortfolioModal();
    } else {
      setActiveTab(tabValue);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const fetchUserPortfoliosResponse = await api.fetchUserPortfolio();
        const { portfolios: userPortfolios } = fetchUserPortfoliosResponse.data;

        const selectedPortfolioValue =
          userPortfolios.length > 0 ? generateTabsValueForPortfolioItem(userPortfolios[0]) : null;

        setActiveTab(selectedPortfolioValue);
        setPortfolios(userPortfolios);
      } catch (error) {
        console.error(error);
        // Handle the error appropriately, such as displaying a message to the user
      } finally {
        setIsPortfolioFetched(true);
      }

      return () => setPortfolios([]);
    })();
  }, []);

  let Content = null;

  if (!isPortfolioFetched) {
    Content = <p>Loading</p>;
  } else if (portfolioCount < 1) {
    Content = (
      <div className="py-4 text-center ">
        <h1 className="font-heading mb-6 text-4xl font-bold leading-none md:text-6xl lg:text-8xl">
          Welcome to your portfolio page!
        </h1>
        <p className="mb-11 text-lg font-medium text-gray-600">
          It looks like you don&apos;t have any portfolios yet. Don&apos;t worry, you can easily
          create a new portfolio by clicking on the{" "}
          <span className="font-semibold text-yellow-600">&apos;Create New Portfolio&apos;</span>{" "}
          button below. Once you have created a portfolio, you can track your investments, view your
          estimated portfolio value, and monitor your progress. Start building your portfolio today!
        </p>
        <div className="w-max rounded-lg bg-charcoal-900 p-2">
          <button
            type="button"
            className="rounded-lg bg-charcoal-400 p-4 font-mono font-light text-gray-500 hover:bg-yellow-700 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            onClick={() => toggleShowCreatePortfolioModal()}
          >
            Create New Portfolio
          </button>
        </div>
      </div>
    );
  } else {
    Content = (
      <Tabs
        defaultValue={activeTab}
        onTabChange={handleTabChange}
        // style={{ display: "flex" }}
        // classNames={{ root: "flex flex-col flex-1", body: "flex-grow" }}
      >
        <Tabs.List>
          {portfolios.map((portfolio, key) => (
            <Tabs.Tab key={portfolio._id} value={generateTabsValueForPortfolioItem(portfolio)}>
              {`Portfolio ${key}`}
            </Tabs.Tab>
          ))}
          <Tabs.Tab value={ADD_PORTFOLIO_TAB_VALUE} icon={<PlusIconSVG width={15} height={15} />} />
        </Tabs.List>

        {portfolios.map(portfolio => (
          <Tabs.Panel
            key={portfolio._id}
            value={generateTabsValueForPortfolioItem(portfolio)}
            // classNames={{ root: "flex" }}
          >
            {activeTab === generateTabsValueForPortfolioItem(portfolio) ? (
              <LazyLoadPortfolio portfolio={portfolio} />
            ) : null}
          </Tabs.Panel>
        ))}
      </Tabs>
    );
  }

  console.log("Portfolio -> render");
  return (
    <>
      <DefaultLayout
        title="Portfolio"
        sidebar="portfolio"
        description="You can see your portfolios estimated value & progress below"
      >
        <AddNewPortfolioModal
          isShowing={showCreatePortfolioModal}
          cancel={toggleShowCreatePortfolioModal}
          onSelection={handleAssetTypeSelection}
        />
        <MaxPortfolioReachedModal
          isShowing={showMaxPortfolioWarningModal}
          cancel={toggleShowMaxPortfolioWarningModal}
        />
        <div className="portfolio-primary-panel flex h-full flex-1 flex-col overflow-y-auto rounded-lg sm:mb-1">
          {Content}
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
