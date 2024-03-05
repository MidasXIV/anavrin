import BarChartWrapper from "@/components/charting/bar-chart/bar-chart";
import { FC } from "react";

interface ICostMarketValueChartProps {
  data: Array<{
    symbol: string;
    costBasis: number;
    marketValue: number;
  }>;
}

const CostMarketValueChart: FC<ICostMarketValueChartProps> = ({ data }) => (
  <BarChartWrapper
    title=""
    data={data}
    index="symbol"
    categories={["costBasis", "marketValue"]}
    colors={["neutral", "blue"]}
    showYAxis={false}
    rotateLabelX
  />
);

export default CostMarketValueChart;
