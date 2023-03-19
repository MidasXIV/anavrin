import { FC } from "react";
import { formatNumber } from "../../util/helper";

type PortfolioAnalysisHeaderProps = {
  totalInvested: number;
  portfolioValue: number;
  percentageChange: number;
};

const PortfolioAnalysisHeader: FC<PortfolioAnalysisHeaderProps> = ({
  totalInvested,
  portfolioValue,
  percentageChange
}) => {
  const changePercent = Math.abs(parseFloat(percentageChange.toFixed(2))) ?? 0;
  const changeIcon = percentageChange < 0 ? "▼" : "▲";
  const changeColor = percentageChange >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex h-full w-2/3 flex-col items-center p-2 md:flex-row md:justify-evenly md:p-4">
      <div className="flex w-full justify-between md:flex-col md:justify-evenly">
        <span className="m-1 text-xs uppercase text-gray-700">INVESTED AMOUNT</span>
        <div className="">
          <span className="text-xl leading-none text-gray-800 md:text-3xl">
            ${formatNumber(totalInvested)}
          </span>
        </div>
      </div>
      <div className="flex w-full justify-between md:flex-col md:justify-evenly">
        <span className="m-1 text-xs uppercase text-gray-700">PORTFOLIO VALUE</span>
        <div className="flex flex-col md:w-full md:flex-row md:items-end">
          <span className="border-charcoal-300 text-xl leading-none text-gray-800 md:m-0 md:border-r md:px-2 md:text-3xl">
            ${formatNumber(portfolioValue)}
          </span>
          <div className="flex justify-end md:items-center">
            <span className={`ml-4 block text-sm leading-5 ${changeColor}`}> {changeIcon}</span>
            <span className="md:text-md m-1 block whitespace-nowrap text-xs leading-none text-gray-800 md:m-0 md:px-2">
              {changePercent} %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalysisHeader;
