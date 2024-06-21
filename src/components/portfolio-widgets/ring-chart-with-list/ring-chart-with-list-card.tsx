import RingChart from "@/components/charting/ring-chart/ring-chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { FC } from "react";
import Card from "../Card/card";

interface DataItem {
  value: number;
  composition: string;
  color?: string;
  tooltip: string;
}

interface RingChartWithListCardProps {
  data: DataItem[];
  title: string;
}

const RingChartWithListCard: FC<RingChartWithListCardProps> = ({ data, title }) => (
  <Card showHeader headerTitle={title}>
    <div className="h-full w-full overflow-auto">
      <div className="h-[65%] w-full px-10">
        <RingChart
          sections={data}
          valueFormatterOverride={valueFormatter}
          category="value"
          index="tooltip"
        />
      </div>
      <div className="flex flex-col text-xs">
        <ScrollArea className="h-[75px]">
          {data.map((dataItem, index) => (
            <div
              key={`ring-chart-data-item-${index + 1}`}
              className="border-1 flex w-full justify-between border-b border-gray-300 px-2 py-1"
            >
              <div className="inline-flex w-1/3">
                <div className="h-4 w-4 rounded-full bg-indigo-700 leading-none" />
                <span className="ml-2 font-bold text-gray-800">{dataItem.tooltip}</span>
              </div>

              <span className="w-1/3 text-left font-medium text-gray-500">
                {valueFormatter(dataItem.value)}
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-tiny leading-none text-red-100">
                {dataItem.composition} %
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  </Card>
);

export default RingChartWithListCard;
