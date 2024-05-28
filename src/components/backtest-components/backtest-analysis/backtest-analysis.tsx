import Card from "@/components/portfolio-widgets/Card/card";
import AssetsComparisonAreaChart from "@/components/portfolio-widgets/assets-comparison-area-chart/assets-comparison-area-chart";
import RingChartWithListCard from "@/components/portfolio-widgets/ring-chart-with-list/ring-chart-with-list-card";
import { convertPortfolioConfigToPortfolios, convertToCombinedFormat } from "lib/backtest-analyze";
import { FC } from "react";
import PortfolioPerformanceOverviewTable from "./portfolio-performance-overview-table";

interface BacktestAnalysisProps {
  analysisData: BacktestAnalyzeDTO;
}

const BacktestAnalysis: FC<BacktestAnalysisProps> = ({ analysisData }) => {
  const { portfoliosGrowth, benchMarkGrowth, request } = analysisData;
  const configPortfolios = convertPortfolioConfigToPortfolios(request);
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
          <div className="flex justify-between">
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
      <PortfolioPerformanceOverviewTable analysisData={analysisData} />
    </section>
  );
};

export default BacktestAnalysis;
