import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { AreaChart } from "@tremor/react";
import { FC } from "react";

interface AreaChartProps {
  data: unknown[];
  index: string;
  categories: Array<string>;
  colors: Array<any>;
  customValueFormatter?: (x: number) => string;
}

const AreaChartWrapper: FC<AreaChartProps> = ({
  data,
  index,
  categories,
  colors,
  customValueFormatter = valueFormatter
}) => (
  <AreaChart
    className="h-full w-full"
    data={data}
    index={index}
    categories={categories}
    colors={colors}
    yAxisWidth={48}
    valueFormatter={customValueFormatter}
    enableLegendSlider
  />
);

export default AreaChartWrapper;
