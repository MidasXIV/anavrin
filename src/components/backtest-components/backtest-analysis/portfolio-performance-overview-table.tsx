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
  return (
    <Card>
      <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        List of Swiss Federal Councillours
      </h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Portfolio</TableHeaderCell>
            <TableHeaderCell>Initial Balance</TableHeaderCell>
            <TableHeaderCell>Final Balance</TableHeaderCell>
            <TableHeaderCell>CAGR</TableHeaderCell>
            <TableHeaderCell>Stdev</TableHeaderCell>
            <TableHeaderCell>Best Year</TableHeaderCell>
            <TableHeaderCell>Worst Year</TableHeaderCell>
            <TableHeaderCell>Max. Drawdown</TableHeaderCell>
            <TableHeaderCell>Sharpe Ratio</TableHeaderCell>
            <TableHeaderCell>Sortino Ratio</TableHeaderCell>
            <TableHeaderCell>Market Correlation</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.initialInvestment}</TableCell>
              <TableCell>{item.finalBalance}</TableCell>
              <TableCell>{item.cagr}</TableCell>
              <TableCell>{item.stdev}</TableCell>
              <TableCell>{item.bestYearPercentageIncrease}</TableCell>
              <TableCell>{item.worstYearPercentageDecrease}</TableCell>
              <TableCell>{item.maxDrawdown}</TableCell>
              <TableCell>{item.sharpeRatio}</TableCell>
              <TableCell>{item.sortinoRatio}</TableCell>
              <TableCell>{item.marketCorrelation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
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
