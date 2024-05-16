import Card from "@/components/portfolio-widgets/Card/card";
import AssetsComparisonAreaChart from "@/components/portfolio-widgets/assets-comparison-area-chart/assets-comparison-area-chart";
import { convertToCombinedFormat } from "lib/backtest-analyze";
import { FC } from "react";

interface BacktestAnalysisProps {
  analysisData: BacktestAnalyzeDTO;
}

const BacktestAnalysis: FC<BacktestAnalysisProps> = ({ analysisData }) => {
  const a = 4 + 5;
  const { portfoliosGrowth, benchMarkGrowth } = analysisData;
  return (
    <section className="flex h-full w-full flex-col">
      <div className="h-[20rem] w-full p-1">
        <Card showHeader headerTitle="Portfolios breakdown">
          <div className="h-full w-full">
            <AssetsComparisonAreaChart
              data={convertToCombinedFormat(portfoliosGrowth, benchMarkGrowth)}
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BacktestAnalysis;
