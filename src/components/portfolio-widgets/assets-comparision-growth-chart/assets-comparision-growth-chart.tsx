import BarChartWrapper from "@/components/charting/bar-chart/bar-chart";
import { FC } from "react";

interface IAssetsComparisionGrowthChartProps {
  data: Array<{
    symbol: string;
    growth: number;
  }>;
}

const AssetsComparisionGrowthChart: FC<IAssetsComparisionGrowthChartProps> = ({ data }) => (
  <BarChartWrapper
    title="Assets Comparision Growth Chart"
    data={data}
    index="symbol"
    categories={["growth"]}
    colors={["blue"]}
    showYAxis={false}
    rotateLabelX
    customValueFormatter={number => `${number} %`}
    // minValue={-100}
  />
);

export default AssetsComparisionGrowthChart;
