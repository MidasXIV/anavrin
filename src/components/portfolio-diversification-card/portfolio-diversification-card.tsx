import { FC } from "react";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { formatPortfolioId, getPortfolioDiversificationChartData } from "../../lib/portfolio-utils";
import RingChart from "../charting/ring-chart/ring-chart";
import { ScrollArea } from "../ui/scroll-area";

interface IPortfolioDiversificationCardProps {
  portfolios: Portfolio[];
}

const PortfolioDiversificationCard: FC<IPortfolioDiversificationCardProps> = ({ portfolios }) => {
  const ringChartData = getPortfolioDiversificationChartData(portfolios);
  return (
    <section className="flex h-full w-full flex-row">
      <div className="max-h-full w-1/2 rounded-bl-lg border-r border-gray-300 p-2 text-sm">
        <RingChart
          sections={ringChartData as Array<{ tooltip: string; value: number }>}
          valueFormatterOverride={valueFormatter}
          category="value"
          index="tooltip"
        />
      </div>
      <div className="flex w-1/2 flex-col text-xs">
        <ScrollArea className="h-[150px]">
          {ringChartData.map((ringChartDataItem, index) => (
            <div
              key={`ring-chart-data-item-${index + 1}`}
              className="border-1 flex w-full justify-between border-b border-gray-300 px-2 py-1"
            >
              <div className="inline-flex w-1/3">
                <div className="h-4 w-4 rounded-full bg-indigo-700 leading-none" />
                <span className="ml-2 font-bold text-gray-800">
                  {formatPortfolioId(ringChartDataItem.tooltip)}
                </span>
              </div>

              <span className="w-1/3 text-left font-medium text-gray-500">
                {valueFormatter(ringChartDataItem.value)}
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-tiny leading-none text-red-100">
                {ringChartDataItem.diversificationPercentage} %
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </section>
  );
};

export default PortfolioDiversificationCard;
