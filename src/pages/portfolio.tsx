import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioSections from "@/components/portfolio-widgets/portfolio-section/portfolio-section";
import AddNewPortfolioModal from "../components/add-new-portfolio-modal";
import LoadingForm from "../components/exchanges-form/loading";
import PlusIconSVG from "../components/icons/plusIconSVG";
import MaxPortfolioReachedModal from "../components/max-portfolio-reached-modal";
import useModal from "../hooks/useModal";
import DefaultLayout from "../layouts/default";
import { AssetType } from "../lib/portfolio-utils";
import api from "../services/create-service";
import { createUrl } from "../utils/helper";
import mockFetchUserPortfolioData from "../tests/mocks/mock-fetchUserPortfolio-v2-1";
import isEmptyDataItem from "../utils/type-gaurds";

const ADD_PORTFOLIO_TAB_VALUE = "add-portfolio";
// const generateTabsValueForPortfolioItem = portfolio => `Portfolio::${portfolio._id}`;
const generateTabsValueForPortfolioItem = portfolio => `${portfolio._id}`;

const LazyLoadPortfolio = dynamic(() => import("../layouts/portfolio"), {
  loading: LoadingForm,
  ssr: false
});

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

    router.push(createUrl("portfolio", newParams));
  };

  const selectedPortfolio = searchParams.get("q") || undefined;

  const { isShowing: showCreatePortfolioModal, toggle: toggleShowCreatePortfolioModal } =
    useModal(false);
  const { isShowing: showMaxPortfolioWarningModal, toggle: toggleShowMaxPortfolioWarningModal } =
    useModal(false);

  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);
  const portfolioCount = portfolios.length;
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

  const handleAssetTypeSelection = (assetType: AssetType, items = []) => {
    // toggleShowCreatePortfolioModal();
    // router push to new page.

    const portfolioId = new Date().getTime();

    portfolios.push({
      _id: portfolioId,
      assetType,
      items
    });

    setSelectedPortfolio(portfolioId);
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
  } else if (!isEmptyDataItem(selectedPortfolio)) {
    Content = (
      <Tabs
        defaultValue={selectedPortfolio}
        onValueChange={handleTabChange}
        className="flex h-full flex-col bg-charcoal-400 sm:bg-transparent "
      >
        <TabsList className="mx-auto w-fit sm:m-0">
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
      <PortfolioSections
        portfolios={portfolios}
        setSelectedPortfolio={setSelectedPortfolio}
        handleAssetTypeSelection={() => toggleShowCreatePortfolioModal()}
      />
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
        <div className="portfolio-primary-panel flex h-full flex-1 flex-col overflow-y-auto rounded-b-lg sm:mb-1 sm:rounded-lg">
          {Content}
        </div>
      </DefaultLayout>
    </>
  );
};

export default Portfolio;
