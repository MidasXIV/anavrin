import { FC } from "react";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { getPortfolioDiversificationChartData } from "../../lib/portfolio-utils";
import RingChart from "../charting/ring-chart/ring-chart";

interface IPortfolioDiversificationCardProps {
  portfolios: Portfolio[];
  size: {
    readonly bottom: number;
    readonly height: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
  };
}

const PortfolioDiversificationCard: FC<IPortfolioDiversificationCardProps> = ({
  portfolios,
  size
}) => {
  const ringChartData = getPortfolioDiversificationChartData(portfolios);
  return (
    <div className="max-w-full rounded-md border border-gray-200 bg-charcoal-400 p-6 text-sm hover:bg-charcoal-900">
      <RingChart
        sections={ringChartData}
        valueFormatterOverride={valueFormatter}
        category="value"
        index="tooltip"
      />
    </div>
  );
};

export default PortfolioDiversificationCard;
