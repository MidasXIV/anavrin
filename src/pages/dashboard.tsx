import { clsx } from "clsx";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import SecondaryPanel from "@/components/secondary-panel";
import Card from "@/components/portfolio-widgets/Card/card";
import PortfolioDiversificationCard from "@/components/portfolio-diversification-card/portfolio-diversification-card";
import PortfolioDashboardPanel from "@/components/portfolio-widgets/portfolio-dashboard-panel";
import LoremIpsum from "@/components/placeholder/lorem-ipsum";
import { useSession } from "next-auth/react";
import DashboardGreeting from "@/components/portfolio-widgets/dashboard-greeting/dashboard-greeting";
import DefaultLayout from "../layouts/default";
import api from "../services/create-service";
import DashboardPortfolioSection from "../components/dashboard-portfolio-section/dashboard-portfolio-section";
import DashboardPortfolioSectionLoading from "../components/dashboard-portfolio-section/dashboard-portfolio-section-loading";
import EconomicEventsPanel from "../components/economic-events-panel";
import { createUrl } from "../utils/helper";
import mockFetchUserPortfolioData from "../tests/mocks/mock-fetchUserPortfolio-1";

const Dashboard: FC = () => {
  const { data: session, status } = useSession();
  const [hide, setHide] = useState(false);
  const [opened, setOpened] = useState(false);
  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const setSelectedPortfolio = selectedPortfolio => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedPortfolio) {
      newParams.set("q", selectedPortfolio);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("portfolio", newParams));
  };

  useEffect(() => {
    (async () => {
      try {
        // const fetchUserPortfoliosResponse = await api.fetchUserPortfolio();
        // const { portfolios: userPortfolios = [] } = fetchUserPortfoliosResponse.data;

        const userPortfolios = mockFetchUserPortfolioData;

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
      <section className="h-full w-full">
        <div className="p-2">
          {status === "loading" ? null : (
            <DashboardGreeting
              userName={`Hi ${status === "unauthenticated" ? "Guest" : session.user.name}`}
              totalValue={40000}
              totalInvestments={31000}
            />
          )}
        </div>

        <DashboardPortfolioSection
          portfolios={portfolios}
          onPortfolioSelect={setSelectedPortfolio}
        />
      </section>
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
        <div className="flex w-full flex-1 flex-col overflow-auto rounded-lg bg-gray-300 sm:mb-1">
          <section className="flex h-full w-full flex-1 flex-row">
            <div
              className={clsx("dashboard-primary-panel overflow-y-auto", {
                "sm:w-full": hide,
                "sm:w-2/5": !hide
              })}
            >
              {Content}
            </div>
            <SecondaryPanel
              showDrawer={opened}
              setShowDrawer={setOpened}
              className="dashboard-secondary-panel m-2 border border-gray-400 sm:w-3/5"
            >
              <section className="flex h-full w-full flex-col">
                <div className="h-2/5 w-full p-1">
                  <Card showHeader headerTitle="Portfolios breakdown">
                    <div className="h-full w-full">
                      {/* <PortfolioDiversificationCard portfolios={portfolios} /> */}
                    </div>
                  </Card>
                </div>
                <div className="flex h-3/5  flex-row">
                  <div className="flex h-full w-1/2 flex-col">
                    <div className="h-1/2 w-full p-1">
                      <Card showHeader headerTitle="Portfolios breakdown">
                        <div className="h-full w-full">
                          <PortfolioDiversificationCard portfolios={portfolios} />
                        </div>
                      </Card>
                    </div>
                    <div className="flex h-1/2 w-full flex-row p-1">
                      <div className="h-full w-1/2 p-1">
                        <Card showHeader headerTitle="Portfolios breakdown 2">
                          <div className="h-full w-full" />
                        </Card>
                      </div>
                      <div className="h-full w-1/2 p-1">
                        <Card showHeader headerTitle="Portfolios breakdown 2">
                          <div className="h-full w-full" />
                        </Card>
                      </div>
                      {/* <Card showHeader headerTitle="Portfolios breakdown 2">
                        <div className="h-full w-full" />
                      </Card> */}
                    </div>
                  </div>
                  <div className="h-full w-1/2">
                    {/* <div className="h-1/2 w-full p-1">
                        <Card showHeader headerTitle="Portfolios breakdown 3">
                          <div className="h-full max-h-full w-full overflow-auto">
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                            nnnnnnnnnnnnnnnnnnnnn
                            <br />
                          </div>
                        </Card>
                      </div> */}
                    <div className="h-full w-full border-gray-400 p-1">
                      <Card showHeader headerTitle="Economic events">
                        <div className="max-h-full w-full overflow-auto">
                          <EconomicEventsPanel variant="compact" />
                          {/* <LoremIpsum /> */}
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </section>
            </SecondaryPanel>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
};
export default Dashboard;
