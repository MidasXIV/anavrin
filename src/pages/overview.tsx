import React, { FC, useEffect, useRef, memo } from "react";
import StockIndiciesPanel from "@/components/stock-indicies-panel";
import EconomicEventsPanel from "@/components/economic-events-panel";
import useScript from "hooks/useScript";

import PortfolioDashboardPanel from "@/components/portfolio-widgets/portfolio-dashboard-panel";
import DefaultLayout from "../layouts/default";

const TradingViewWidget = () => {
  const config = {
    feedMode: "all_symbols",
    isTransparent: false,
    displayMode: "regular",
    width: "100%",
    height: "100%",
    colorTheme: "light",
    locale: "en"
  };

  console.log(JSON.stringify(config));
  useScript({
    url: "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js",
    innerHTML: JSON.stringify(config)
  });
  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

const Overview: FC = () => (
  <>
    <DefaultLayout
      title="Overview"
      sidebar="overview"
      description="You can see your portfolios estimated value & progress below"
    >
      <div className="flex w-full flex-1 flex-col overflow-auto rounded-lg bg-gray-200">
        {/* <div className="w-full overflow-y-auto border border-r-2 p-4 md:w-1/3">
          <EconomicEventsPanel />
        </div> */}
        {/* <div className="w-full overflow-y-auto border border-r-2 p-4 md:w-1/3">
          <TradingViewWidget22 />
        </div> */}
        {/* <div className="outline-test h-full w-full">
          <PortfolioDashboardPanel portfolios={[]} />
        </div> */}

        <div className="w-full overflow-y-auto p-4">
          <StockIndiciesPanel />
        </div>
      </div>
    </DefaultLayout>
  </>
);

export default Overview;
