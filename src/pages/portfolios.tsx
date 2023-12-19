import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useResizeObserver } from "@mantine/hooks";
import AddNewAssetPortfolioCard from "@/components/portfolio-widgets/add-new-asset-portfolio-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewPortfolioModal from "../components/add-new-portfolio-modal";
import LoadingForm from "../components/exchanges-form/loading";
import PlusIconSVG from "../components/icons/plusIconSVG";
import MaxPortfolioReachedModal from "../components/max-portfolio-reached-modal";
import useModal from "../hooks/useModal";
import DefaultLayout from "../layouts/default";
import { AssetType } from "../lib/portfolio-utils";
import api from "../services/create-service";
import { createUrl } from "../utils/helper";
import mockFetchUserPortfolioData from "../tests/mocks/mock-fetchUserPortfolio-1";
import PortfolioOverviewCard from "../components/portfolio-overview-card/portfolio-overview-card";
import isEmptyDataItem from "../utils/type-gaurds";

const ADD_PORTFOLIO_TAB_VALUE = "add-portfolio";
// const generateTabsValueForPortfolioItem = portfolio => `Portfolio::${portfolio._id}`;
const generateTabsValueForPortfolioItem = portfolio => `${portfolio._id}`;

const LazyLoadPortfolio = dynamic(() => import("../layouts/portfolio"), {
  loading: LoadingForm,
  ssr: false
});

const PortfolioSection = ({
  title,
  assetType,
  portfolios,
  setSelectedPortfolio,
  handleAssetTypeSelection
}) => (
  <article className="mb-6">
    <h1 className="mb-4 text-3xl font-semibold">{title}</h1>
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {portfolios
        .filter(portfolio => portfolio.assetType === assetType)
        .map(portfolio => (
          <PortfolioOverviewCard
            key={portfolio._id}
            portfolio={portfolio}
            onPortfolioSelect={setSelectedPortfolio}
          />
        ))}
      <AddNewAssetPortfolioCard
        handleAssetTypeSelection={() => handleAssetTypeSelection(assetType)}
      />
    </div>
  </article>
);

const Portfolio: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSelectedPortfolio = selectedCrypto => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedCrypto) {
      newParams.set("q", selectedCrypto);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("portfolios", newParams));
  };

  const selectedPortfolio = searchParams.get("q") || undefined;

  const { isShowing: showCreatePortfolioModal, toggle: toggleShowCreatePortfolioModal } =
    useModal(false);
  const { isShowing: showMaxPortfolioWarningModal, toggle: toggleShowMaxPortfolioWarningModal } =
    useModal(false);

  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);
  const portfolioCount = portfolios.length;
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

  const handleAssetTypeSelection = (assetType: AssetType) => {
    // toggleShowCreatePortfolioModal();
    portfolios.push({
      _id: new Date().getTime(),
      assetType,
      items: []
    });
  };

  const [ref, size] = useResizeObserver();

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
      // setActiveTab(tabValue);
      setSelectedPortfolio(tabValue);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // const fetchUserPortfoliosResponse = await api.fetchUserPortfolio();
        // const { portfolios: userPortfolios } = fetchUserPortfoliosResponse.data;

        const userPortfolios = mockFetchUserPortfolioData;

        // const selectedPortfolioValue =
        //   userPortfolios.length > 0 ? generateTabsValueForPortfolioItem(userPortfolios[0]) : null;

        // setActiveTab(selectedPortfolioValue);
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
  } else if (!isEmptyDataItem(selectedPortfolio)) {
    Content = (
      <Tabs
        defaultValue={selectedPortfolio}
        onValueChange={handleTabChange}
        className="flex h-full flex-col"
      >
        <TabsList className="w-fit">
          {portfolios.map((portfolio, key) => (
            <TabsTrigger key={portfolio._id} value={generateTabsValueForPortfolioItem(portfolio)}>
              {`Portfolio ${key}`}
            </TabsTrigger>
          ))}
          <TabsTrigger value={ADD_PORTFOLIO_TAB_VALUE}>
            <PlusIconSVG width={15} height={15} />
          </TabsTrigger>
        </TabsList>

        {portfolios.map(portfolio => (
          <TabsContent
            key={portfolio._id}
            value={generateTabsValueForPortfolioItem(portfolio)}
            className="flex-1"
          >
            {selectedPortfolio === generateTabsValueForPortfolioItem(portfolio) ? (
              <LazyLoadPortfolio portfolio={portfolio} />
            ) : null}
          </TabsContent>
        ))}
      </Tabs>
    );
  } else {
    Content = (
      <section className="h-full overflow-auto p-2">
        <PortfolioSection
          title="Crypto"
          assetType={AssetType.CRYPTO}
          portfolios={portfolios}
          setSelectedPortfolio={setSelectedPortfolio}
          handleAssetTypeSelection={handleAssetTypeSelection}
        />
        <PortfolioSection
          title="Stock"
          assetType={AssetType.STOCK}
          portfolios={portfolios}
          setSelectedPortfolio={setSelectedPortfolio}
          handleAssetTypeSelection={handleAssetTypeSelection}
        />
        <PortfolioSection
          title="Dubai Financial market"
          assetType={AssetType.DFM}
          portfolios={portfolios}
          setSelectedPortfolio={setSelectedPortfolio}
          handleAssetTypeSelection={handleAssetTypeSelection}
        />
      </section>
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
        {showCreatePortfolioModal ? (
          <AddNewPortfolioModal
            isShowing={showCreatePortfolioModal}
            cancel={toggleShowCreatePortfolioModal}
            onSelection={handleAssetTypeSelection}
          />
        ) : null}
        {showMaxPortfolioWarningModal ? (
          <MaxPortfolioReachedModal
            isShowing={showMaxPortfolioWarningModal}
            cancel={toggleShowMaxPortfolioWarningModal}
          />
        ) : null}
        <div className="portfolio-primary-panel flex h-full flex-1 flex-col overflow-y-auto rounded-lg sm:mb-1">
          {Content}
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
