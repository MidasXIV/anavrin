import { BarChart, Card, Title } from "@tremor/react";
import { FC } from "react";

const valueFormatter = number => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

interface BarChartProps {
  data: unknown[];
  index: string;
  categories: Array<string>;
  colors: Array<any>;
  title: string;
  showLegend?: boolean;
}

const BarChartWrapper: FC<BarChartProps> = ({
  title,
  data,
  index,
  categories,
  colors,
  showLegend = false
}) => (
  // <Card className="w-full h-full">
  <>
    {/* <Title>{title}</Title> */}
    <BarChart
      className="h-full w-full"
      data={data}
      index={index}
      categories={categories}
      colors={colors}
      valueFormatter={valueFormatter}
      yAxisWidth={48}
      showLegend={showLegend}
    />

    {/* </Card> */}
  </>
);

export default BarChartWrapper;
