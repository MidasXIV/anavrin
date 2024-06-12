import { FC } from "react";

import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from "@tremor/react";
import { calculatePortfolioMetrics } from "lib/backtest-analyze";

interface PortfolioPerformanceOverviewTableProps {
  analysisData: BacktestAnalyzeDTO;
}

export function TableUsageExample({ data }) {
  const metrics = [
    { prop: "initialInvestment", text: "Initial Balance" },
    { prop: "finalBalance", text: "Final Balance" },
    { prop: "cagr", text: "CAGR" },
    { prop: "stdev", text: "Stdev" },
    { prop: "bestYearPercentageIncrease", text: "Best Year" },
    { prop: "worstYearPercentageDecrease", text: "Worst Year" },
    { prop: "maxDrawdown", text: "Max. Drawdown" },
    { prop: "sharpeRatio", text: "Sharpe Ratio" },
    { prop: "sortinoRatio", text: "Sortino Ratio" },
    { prop: "marketCorrelation", text: "Market Correlation" }
  ];

  return (
    <div>
      <div className="flex w-full items-center rounded-md border border-gray-300 p-2">
        <span className="inline-flex w-full items-center justify-center border-gray-300 font-medium ">
          Metric
        </span>
        {Array.from({ length: data.length }).map((_, index) => (
          <div
            key={index.toString()}
            className="flex w-full items-center justify-center border-l-2 border-gray-300 px-1 text-center"
          >
            <span className="w-full border-gray-300 font-medium">{`Portfolio ${index + 1}`}</span>
          </div>
        ))}
      </div>
      {metrics.map(metric => (
        <div
          className="flex w-full items-center rounded-md border border-gray-300 p-2"
          key={metric.prop}
        >
          <span className="inline-flex w-full items-center justify-center border-gray-300 font-medium ">
            {metric.text}
          </span>
          {data.map((_, index) => (
            <div
              key={index.toString()}
              className="flex w-full items-center justify-center border-l-2 border-gray-300 px-1 text-center"
            >
              <span className="w-full border-gray-300">{_[metric.prop]}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const PortfolioPerformanceOverviewTable: FC<PortfolioPerformanceOverviewTableProps> = ({
  analysisData
}) => {
  const { portfoliosGrowth } = analysisData;
  const tr = portfoliosGrowth.map((growth, index) => ({
    name: `Portfolio ${index + 1}`,
    ...calculatePortfolioMetrics(growth)
  }));
  return <TableUsageExample data={tr} />;
};

export default PortfolioPerformanceOverviewTable;
