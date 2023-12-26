/* eslint-disable react/require-default-props */
import { DonutChart } from "@tremor/react";
import { FC } from "react";

type RingChartSections = Array<{ value: number; tooltip: string }>;

/**
 * category -> tool tip text
 * index -> numerical value
 */
type RingChartProps = {
  sections: RingChartSections;
  valueFormatterOverride: (x: any) => string;
  category: string;
  index: string;
};

const RingChart: FC<RingChartProps> = ({
  sections = [],
  valueFormatterOverride,
  category,
  index
}) => (
  <DonutChart
    className="h-full w-full"
    data={sections}
    category={category}
    index={index}
    colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
    // onValueChange={(v) => setValue(v)}
    valueFormatter={valueFormatterOverride}
  />
);
export default RingChart;
