/* eslint-disable react/require-default-props */
import { Group } from "@mantine/core";
import { DonutChart } from "@tremor/react";
import { FC, useState } from "react";

type RingChartSections = Array<{ value: number; tooltip: string }>;
// type RingChartSections = RingProgressProps["sections"];

/**
 * category -> tool tip text
 * index -> numerical value
 */
interface RingChartProps {
  sections: RingChartSections;
  width?: number;
}

const RingChart: FC<RingChartProps> = ({
  sections = [],
  width = 200
}: {
  sections: RingChartSections;
  width?: number;
}) => (
  <Group position="center">
    {/* <RingProgress size={width} thickness={12} roundCaps sections={sections} /> */}
    {/* <Text>Hovered section: {hovered === -1 ? "none" : hovered}</Text> */}
    <DonutChart
      className=""
      data={sections}
      category="value"
      index="tooltip"
      colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
      // onValueChange={(v) => setValue(v)}
    />
  </Group>
);
export default RingChart;
