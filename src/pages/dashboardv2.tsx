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
import DashboardCalendarChart from "@/components/dashboard-portfolio-section/calendar-chart";
import {
  calculateCrptoPortfolioValue,
  hydrateCryptoPortfolioItemsV2
} from "lib/portfolio-asset-utils";
import { StockLineChart } from "@/components/charting/stock-line-chart/stock-line-chart";
import DefaultLayout from "../layouts/default";
import api from "../services/create-service";
import DashboardPortfolioSection from "../components/dashboard-portfolio-section/dashboard-portfolio-section";
import DashboardPortfolioSectionLoading from "../components/dashboard-portfolio-section/dashboard-portfolio-section-loading";
import EconomicEventsPanel from "../components/economic-events-panel";
import { createUrl } from "../utils/helper";
import mockFetchUserPortfolioData from "../tests/mocks/mock-crypto-portfolio-2";

enum CalendarMode {
  OneMonth = "1-month",
  SixMonths = "6-months",
  EntireYear = "entire-year",
  YearToMonth = "year-to-month"
}

const Dashboard: FC = () => {
  const { data: session, status } = useSession();
  const [hide, setHide] = useState(false);
  const [opened, setOpened] = useState(false);
  const [portfolioPerformanceStockLineChartData, setPortfolioPerformanceStockLineChartData] =
    useState([]);
  const [portfolioPerformance, setPortfolioPerformance] = useState<CrptoPortfolioValue>(undefined);
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

        for (const userPortfolio of userPortfolios) {
          const data = await hydrateCryptoPortfolioItemsV2(userPortfolio);
          const portfolioPerformance = calculateCrptoPortfolioValue(data);
          const portfolioPerformanceStockLineChartData = portfolioPerformance?.quotes.map(
            (a, index) => ({
              value: a.value,
              time: a.date,
              ticker: `Portfolio-${index + 1}`
            })
          );
          setPortfolioPerformance(portfolioPerformance);
          setPortfolioPerformanceStockLineChartData(portfolioPerformanceStockLineChartData);
          console.log(portfolioPerformance);
        }

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
        <DashboardCalendarChart data={portfolioPerformance} mode={CalendarMode.YearToMonth} />
        <StockLineChart data={[portfolioPerformanceStockLineChartData]} />
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
              "sm:w-full": hide
              // "sm:w-2/5": !hide
              // "sm:w-full": !hide
            })}
          >
            {Content}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
export default Dashboard;
