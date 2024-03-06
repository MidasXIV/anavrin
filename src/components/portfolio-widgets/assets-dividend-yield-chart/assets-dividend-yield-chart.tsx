import BarChartWrapper from "@/components/charting/bar-chart/bar-chart";
import { FC } from "react";

interface IAssetsDividendYieldChartProps {
  data: Array<{
    symbol: string;
    growth: number;
  }>;
}

const AssetsDividendYieldChart: FC<IAssetsDividendYieldChartProps> = ({ data }) => (
  <BarChartWrapper
    title="Assets Comparision Growth Chart"
    data={data}
    index="symbol"
    categories={["yield"]}
    colors={["blue"]}
    showYAxis
    rotateLabelX
    customValueFormatter={number => `${number} %`}
    // minValue={-100}
  />
);

export default AssetsDividendYieldChart;
