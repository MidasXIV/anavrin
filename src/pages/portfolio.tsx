import { Tab, Tabs } from "@mantine/core";
import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import AddNewPortfolioModal from "../components/add-new-portfolio-modal";
import LoadingForm from "../components/exchanges-form/loading";
import PlusIconSVG from "../components/icons/plusIconSVG";
import MaxPortfolioReachedModal from "../components/max-portfolio-reached-modal";
import useModal from "../hooks/useModal";
import DefaultLayout from "../layouts/default";
import { AssetType } from "../lib/portfolio-utils";
import { fetchUserPortfolio } from "../util/user-portfolio";

const LazyLoadPortfolio = dynamic(() => import("../layouts/portfolio"), {
  loading: LoadingForm,
  ssr: false
});

const Portfolio: FC = () => {
  const [tabCount, setTabCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const { isShowing: showCreatePortfolioModal, toggle: toggleShowCreatePortfolioModal } =
    useModal(false);
  const { isShowing: showMaxPortfolioWarningModal, toggle: toggleShowMaxPortfolioWarningModal } =
    useModal(false);

  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);

  const portfolioCount = portfolios.length;
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

  const handleAssetTypeSelection = (assetType: AssetType) => {
    toggleShowCreatePortfolioModal();
    portfolios.push({
      assetType,
      items: []
    });
    setTabCount(tabCount + 1);
  };

  const handleTabChange = (tabIndex: number) => {
    const dummyVal = 2;
    const PortfolioLimit = 2;

    if (tabIndex === tabCount + dummyVal - 1) {
      if (tabCount >= PortfolioLimit) {
        toggleShowMaxPortfolioWarningModal();
        console.log("Max Portfolios created");
        return;
      }
      toggleShowCreatePortfolioModal();
    } else {
      setActiveTab(tabIndex);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const fetchUserPortfoliosResponse = await fetchUserPortfolio();
        const { portfolios: userPortfolios } = fetchUserPortfoliosResponse.data;
        setPortfolios(userPortfolios);
      } catch (error) {
        console.error(error);
        // Handle the error appropriately, such as displaying a message to the user
      } finally {
        setIsPortfolioFetched(true);
      }
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
            className="focus:outline-none rounded-lg bg-charcoal-400 p-4 font-mono font-light text-gray-500 hover:bg-yellow-700 hover:text-white focus:text-white focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
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
        active={activeTab}
        onTabChange={handleTabChange}
        style={{ display: "flex" }}
        classNames={{ root: "flex flex-col flex-1", body: "flex-grow" }}
      >
        {/* <Tab label="Portfolio 1" classNames={{ root: "flex" }}>
          <LazyLoadPortfolio portfolioType={AssetType.CRYPTO} />
        </Tab> */}
        {portfolios.map((portfolio, key) => (
          <Tab key={portfolio._id} label={`Portfolio ${key}`} classNames={{ root: "flex" }}>
            <LazyLoadPortfolio portfolio={portfolio} />
          </Tab>
        ))}
        <Tab icon={<PlusIconSVG width={15} height={15} />} />
      </Tabs>
    );
  }

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
        <div className="portfolio-primary-panel flex h-full flex-col overflow-y-auto">
          {Content}
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
