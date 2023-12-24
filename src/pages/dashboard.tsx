import { clsx } from "clsx";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import SecondaryPanel from "@/components/secondary-panel";
import Card from "@/components/portfolio-widgets/Card/card";
import PortfolioDiversificationCard from "@/components/portfolio-diversification-card/portfolio-diversification-card";
import DefaultLayout from "../layouts/default";
import api from "../services/create-service";
import DashboardPortfolioSection from "../components/dashboard-portfolio-section/dashboard-portfolio-section";
import DashboardPortfolioSectionLoading from "../components/dashboard-portfolio-section/dashboard-portfolio-section-loading";
import EconomicEventsPanel from "../components/economic-events-panel";
import { createUrl } from "../utils/helper";

const Dashboard: FC = () => {
  const [hide, setHide] = useState(false);
  const [opened, setOpened] = useState(false);
  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        const fetchUserPortfoliosResponse = await api.fetchUserPortfolio();
        const { portfolios: userPortfolios = [] } = fetchUserPortfoliosResponse.data;
        setPortfolios(userPortfolios);
      } catch (error) {
        console.error(error);
        // Handle the error appropriately, such as displaying a message to the user
      } finally {
        setIsPortfolioFetched(true);
        console.log("done");
      }

      return () => setPortfolios([]);
    })();
  }, []);

  let Content = null;
  if (!isPortfolioFetched) {
    Content = <DashboardPortfolioSectionLoading />;
  } else if (portfolios?.length > 0) {
    Content = (
      <DashboardPortfolioSection portfolios={portfolios} onPortfolioSelect={setSelectedPortfolio} />
    );
  } else {
    Content = (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-gray-500">You don&apos;t have any portfolios.</p>
        <p className="text-gray-500">Create a portfolio to get started!</p>
      </div>
    );
  }

  return (
    <>
      <DefaultLayout
        title="Dashboard"
        sidebar="dashboard"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className=" flex w-full flex-1 flex-col overflow-auto rounded-lg bg-gray-300 p-3">
          <section className="h-2/5 w-full p-2">
            <div className="flex h-full w-full flex-row rounded-xl border border-gray-400 bg-gray-200">
              <div className="h-full w-1/2" />
              <div className="h-full w-1/4 border-l border-gray-400">
                <div className="h-1/2 w-full" />
                <div className="h-1/2 w-full border-t border-gray-400" />
              </div>
              <div className="h-full w-1/4 border-l border-gray-400">
                <div className="h-1/2 w-full" />
                <div className="h-1/2 w-full border-t border-gray-400" />
              </div>
            </div>
          </section>
          <section className="flex w-full flex-1 flex-row">
            <div
              className={clsx("dashboard-primary-panel overflow-y-auto", {
                "sm:w-full": hide,
                "sm:w-8/12": !hide
              })}
            >
              {Content}
            </div>
            <SecondaryPanel
              showDrawer={opened}
              setShowDrawer={setOpened}
              className="m-2 border border-gray-400"
            >
              <>
                <section className="w-full">
                  <div className="h-full w-full p-1">
                    <Card showHeader headerTitle="Portfolios breakdown">
                      <div className="h-full max-h-52 w-full">
                        <PortfolioDiversificationCard portfolios={portfolios} />
                      </div>
                    </Card>
                  </div>
                </section>
              </>
            </SecondaryPanel>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
};
export default Dashboard;
