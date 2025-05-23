import AreaChartWrapper from "@/components/charting/area-chart/area-chart";
import { FC } from "react";

interface IAssetsComparisonAreaChartProps {
  data: Array<{
    timeFrame: string;
    [key: string]: number | string;
  }>;
  customValueFormatter?: (varr: number) => string;
}

const valueFormatter = number => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const AssetsComparisonAreaChart: FC<IAssetsComparisonAreaChartProps> = ({
  data,
  customValueFormatter = valueFormatter
}) => {
  const categories = data && Object.keys(data[0]).filter(key => key !== "timeFrame");

  console.log(categories, data);
  return (
    <div className="h-full max-h-full min-h-[14rem] w-full sm:min-h-full">
      <AreaChartWrapper
        data={data}
        index="timeFrame"
        categories={categories}
        // TODO: auto generate colors
        colors={["blue", "red", "yellow"]}
        customValueFormatter={customValueFormatter}
      />
    </div>
  );
};
export default AssetsComparisonAreaChart;
