import { FC } from "react";
import { valueFormatter } from "@/utils/timeAndDateHelpers";

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
    <div>
      <div className="pb-2 sm:hidden">
        <div className="flex flex-row items-center justify-center pb-2">
          <span className="p-2 font-sans text-4xl leading-none text-gray-100">
            {valueFormatter(portfolioValue)}
          </span>
          {/* <div className="flex flex-col border-l border-gray-300 ">
            <div className="flex justify-end md:items-center">
              <span className={`ml-4 block text-sm leading-5 ${changeColor}`}> {changeIcon}</span>
              <span className="m-1 block whitespace-nowrap text-xs leading-none text-gray-100">
                {changePercent} %
              </span>
            </div>
            <span className="px-2 font-light leading-none text-gray-200">
              {valueFormatter(portfolioValue - totalInvested)}
            </span>
          </div> */}
        </div>
        <div className="mx-auto flex w-fit items-center">
          <div className="flex items-center">
            <span className={`ml-4 block text-sm leading-5 ${changeColor}`}> {changeIcon}</span>
            <span className="m-1 block whitespace-nowrap leading-none text-gray-100">
              {changePercent} %
            </span>
          </div>
          <span className="px-2 leading-none text-gray-200">
            ({valueFormatter(portfolioValue - totalInvested)})
          </span>
        </div>
      </div>

      <div className="hidden h-full w-full flex-col items-center p-2 sm:flex md:flex-row md:justify-evenly md:p-4">
        <div className="flex w-full justify-between md:flex-col md:justify-evenly">
          <span className="m-1 text-xs uppercase text-gray-700">INVESTED AMOUNT</span>
          <div className="">
            <span className="text-xl leading-none text-gray-800 md:text-3xl">
              {valueFormatter(totalInvested)}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between md:flex-col md:justify-evenly">
          <span className="m-1 text-xs uppercase text-gray-700">PORTFOLIO VALUE</span>
          <div className="flex flex-col md:w-full md:flex-row md:items-end">
            <span className="border-charcoal-300 text-xl leading-none text-gray-800 md:m-0 md:border-r md:px-2 md:text-3xl">
              {valueFormatter(portfolioValue)}
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
    </div>
  );
};

export default PortfolioAnalysisHeader;
