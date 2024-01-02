import { BarChart } from "@tremor/react";
import { FC } from "react";

const valueFormatter = number => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

interface BarChartProps {
  data: unknown[];
  index: string;
  categories: Array<string>;
  colors: Array<any>;
  title: string;
  showLegend?: boolean;
  minValue?: number;
  showYAxis?: boolean;
  rotateLabelX?: boolean;
  customValueFormatter?: (x: number) => string;
}

const BarChartWrapper: FC<BarChartProps> = ({
  title,
  data,
  index,
  categories,
  colors,
  showLegend = false,
  showYAxis = true,
  rotateLabelX = false,
  customValueFormatter = valueFormatter,
  minValue
}) => (
  <BarChart
    className="h-full w-full"
    data={data}
    index={index}
    categories={categories}
    colors={colors}
    valueFormatter={customValueFormatter}
    yAxisWidth={48}
    showLegend={showLegend}
    showYAxis={showYAxis}
    rotateLabelX={rotateLabelX ? { angle: -90 } : { angle: 0 }}
    minValue={minValue || undefined}
  />
);

export default BarChartWrapper;
