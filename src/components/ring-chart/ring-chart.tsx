/* eslint-disable react/require-default-props */
import { RingProgress, Text, Group, RingProgressProps } from "@mantine/core";
import { FC, useState } from "react";

// type RingChartSections = Array<{ value: number; color: string; tooltip: string }>;
type RingChartSections = RingProgressProps["sections"];

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
    <RingProgress size={width} thickness={12} roundCaps sections={sections} />
    {/* <Text>Hovered section: {hovered === -1 ? "none" : hovered}</Text> */}
  </Group>
);
export default RingChart;
