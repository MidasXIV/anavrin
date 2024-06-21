import Card from "@/components/portfolio-widgets/Card/card";
import AssetsComparisonAreaChart from "@/components/portfolio-widgets/assets-comparison-area-chart/assets-comparison-area-chart";
import RingChartWithListCard from "@/components/portfolio-widgets/ring-chart-with-list/ring-chart-with-list-card";
import {
  convertPortfolioConfigToPortfolios,
  convertToCombinedFormat,
  convertToCombinedFormat2
} from "lib/backtest-analyze";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import PortfolioPerformanceOverviewTable from "./portfolio-performance-overview-table";
import { StockLineChart } from "@/components/charting/stock-line-chart/stock-line-chart";

interface BacktestAnalysisProps {
  analysisData: BacktestAnalyzeDTO;
}

const BacktestAnalysis: FC<BacktestAnalysisProps> = ({ analysisData }) => {
  const { portfoliosGrowth, benchMarkGrowth, request } = analysisData;
  const configPortfolios = convertPortfolioConfigToPortfolios(request);
  const stockLineChartData = convertToCombinedFormat2(portfoliosGrowth, benchMarkGrowth);

  console.log(stockLineChartData);
  
  return (
    <section className="flex h-full w-full flex-col">
      <div className="h-[20rem] w-full p-1">
        <Card showHeader headerTitle="Portfolios growth">
          <div className="h-full w-full">
            <AssetsComparisonAreaChart
              data={convertToCombinedFormat(portfoliosGrowth, benchMarkGrowth)}
            />
          </div>
        </Card>
      </div>
      <div className="w-full p-1">
        <Card showHeader headerTitle="Portfolios breakdown">
          <div className="flex flex-col justify-between space-y-2 md:flex-row md:space-y-0">
            {configPortfolios.map((portfolio, index) => (
              <div key={index} className="h-[20rem] w-full">
                <div className="h-full w-full">
                  <RingChartWithListCard data={portfolio} title={`Portfolio ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="w-full p-1">
        <Card showHeader headerTitle="Portfolios metrics">
          <PortfolioPerformanceOverviewTable analysisData={analysisData} />
        </Card>
      </div>
      <div className="w-full p-1">
        <Card showHeader headerTitle="Portfolios metrics">
          <StockLineChart data={stockLineChartData} />
        </Card>
      </div>
    </section>
  );
};

export default BacktestAnalysis;
