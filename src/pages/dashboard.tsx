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
import AssetsComparisonAreaChart from "@/components/portfolio-widgets/assets-comparison-area-chart/assets-comparison-area-chart";
import { isMobileUI } from "lib/viewport";
import { Button } from "@/components/ui/button";
import TrackerChart from "@/components/charting/tracker/tracker";
import { Pencil1Icon } from "@radix-ui/react-icons";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import TrackerBlock from "@/components/portfolio-widgets/tracker-block/tracker-block";
import GoalsTrackerCard from "@/components/portfolio-widgets/goals-tracker-card/goal-tracker-card";
import CostMarketValueChart from "@/components/portfolio-widgets/cost-market-value-chart/cost-market-value-chart";
import DefaultLayout from "../layouts/default";
import api from "../services/create-service";
import DashboardPortfolioSection from "../components/dashboard-portfolio-section/dashboard-portfolio-section";
import DashboardPortfolioSectionLoading from "../components/dashboard-portfolio-section/dashboard-portfolio-section-loading";
import EconomicEventsPanel from "../components/economic-events-panel";
import { createUrl } from "../utils/helper";
import mockFetchUserPortfolioData from "../tests/mocks/mock-fetchUserPortfolio-v2-1";

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
        <div className="rounded-xl border-b-2 border-gray-700 bg-gray-200 shadow-lg sm:border-0 sm:p-2 sm:shadow-none">
          {status === "loading" ? null : (
            <>
              <DashboardGreeting
                userName={`Hi ${status === "unauthenticated" ? "Guest" : session.user.name}`}
                totalValue={40543.34}
                totalInvestments={31000}
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-full w-full py-2 hover:bg-transparent hover:text-gray-300 sm:hidden"
                onClick={() => {
                  setHide(!hide);
                  if (isMobileUI()) {
                    setOpened(true);
                  }
                }}
              >
                Analyse Portfolio
              </Button>
            </>
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
        <div className="flex h-full w-full flex-1 flex-row overflow-auto rounded-xl bg-gray-300 sm:mb-1 sm:rounded-lg">
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
            className="dashboard-secondary-panel m-2 hidden w-full border border-gray-400 sm:w-3/5"
          >
            <section className="flex h-full w-full flex-col">
              <div className="h-2/5 w-full p-1">
                <Card showHeader headerTitle="Portfolios breakdown">
                  <div className="h-full w-full">
                    <AssetsComparisonAreaChart
                      data={[
                        {
                          timeFrame: "Jan 2023",
                          asset1: 14,
                          asset2: 50,
                          asset3: 65
                        },
                        {
                          timeFrame: "Feb 2023",
                          asset1: 16,
                          asset2: 45,
                          asset3: 60
                        },
                        {
                          timeFrame: "March 2023",
                          asset1: 17,
                          asset2: 36,
                          asset3: 55
                        },
                        {
                          timeFrame: "Apr 2023",
                          asset1: 14,
                          asset2: 22,
                          asset3: 54
                        },
                        {
                          timeFrame: "May 2023",
                          asset1: 15,
                          asset2: 20,
                          asset3: 50
                        },
                        {
                          timeFrame: "Jun 2023",
                          asset1: 10,
                          asset2: 13,
                          asset3: 51
                        },
                        {
                          timeFrame: "Jul 2023",
                          asset1: 13,
                          asset2: 5,
                          asset3: 45
                        },
                        {
                          timeFrame: "Aug 2023",
                          asset1: 12,
                          asset2: -2,
                          asset3: 46
                        },
                        {
                          timeFrame: "Sept 2023",
                          asset1: 17,
                          asset2: -5,
                          asset3: 50
                        },
                        {
                          timeFrame: "Oct 2023",
                          asset1: 20,
                          asset2: 1,
                          asset3: 51
                        },
                        {
                          timeFrame: "Nov 2023",
                          asset1: 22,
                          asset2: 4,
                          asset3: 49
                        },
                        {
                          timeFrame: "Dec 2023",
                          asset1: 22,
                          asset2: 12,
                          asset3: 47
                        },
                        {
                          timeFrame: "Jan 2024",
                          asset1: 23,
                          asset2: 13,
                          asset3: 45
                        }
                      ]}
                      customValueFormatter={value => `${value} %`}
                    />
                  </div>
                </Card>
              </div>
              <div className="flex h-3/5 flex-col sm:flex-row">
                <div className="flex h-full w-full flex-col sm:w-1/2">
                  <div className="h-1/2 w-full p-1">
                    <Card showHeader headerTitle="Asset allocation chart">
                      <div className="h-full w-full">
                        <PortfolioDiversificationCard portfolios={portfolios} />
                      </div>
                    </Card>
                  </div>
                  <div className="flex h-1/2 w-full flex-row space-x-2 p-1">
                    <div className="h-full w-1/2">
                      <GoalsTrackerCard />
                    </div>
                    <div className="h-full w-1/2">
                      <Card showHeader headerTitle="Cost and Market value">
                        <div className="h-full w-full p-2">
                          <CostMarketValueChart
                            data={[
                              {
                                symbol: "c8534e",
                                costBasis: 750,
                                marketValue: 980
                              },
                              {
                                symbol: "93e9bd",
                                costBasis: 30233,
                                marketValue: 58500
                              },
                              {
                                symbol: "be2sof",
                                costBasis: 300,
                                marketValue: 245
                              }
                            ]}
                          />
                        </div>
                      </Card>
                    </div>
                    {/* <Card showHeader headerTitle="Portfolios breakdown 2">
                        <div className="h-full w-full" />
                      </Card> */}
                  </div>
                </div>
                <div className="h-full w-full sm:w-1/2">
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
        </div>
      </DefaultLayout>
    </>
  );
};
export default Dashboard;
