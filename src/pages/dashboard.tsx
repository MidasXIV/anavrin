import { Button } from "@mantine/core";

import cn from "classnames";
import { FC, useEffect, useState } from "react";
import LoremIpsum from "../components/placeholder/lorem-ipsum";

import DefaultLayout from "../layouts/default";
import api from "../services/create-service";
import DashboardPortfolioSection from "../components/dashboard-portfolio-section/dashboard-portfolio-section";
import DashboardPortfolioSectionLoading from "../components/dashboard-portfolio-section/dashboard-portfolio-section-loading";
import EconomicEventsPanel from "../components/economic-events-panel";

const Dashboard: FC = () => {
  const [hide, setHide] = useState(false);
  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);
  const [isPortfolioFetched, setIsPortfolioFetched] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const fetchUserPortfoliosResponse = await api.fetchUserPortfolio();
        const { portfolios: userPortfolios } = fetchUserPortfoliosResponse.data;
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

  return (
    <>
      <DefaultLayout
        title="Dashboard"
        sidebar="dashboard"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className="flex w-full flex-1 flex-row overflow-auto rounded-t-lg">
          <div
            className={cn("dashboard-primary-panel overflow-y-auto", {
              "sm:w-full": hide,
              "sm:w-8/12": !hide
            })}
          >
            {isPortfolioFetched ? (
              <DashboardPortfolioSection portfolios={portfolios} />
            ) : (
              <DashboardPortfolioSectionLoading />
            )}
          </div>
          <div
            className={cn("dashboard-secondary-panel overflow-y-auto", {
              "sm:w-1/4": hide
            })}
          >
            {/* Secondary Panel
            <LoremIpsum /> */}
            <EconomicEventsPanel />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
export default Dashboard;
