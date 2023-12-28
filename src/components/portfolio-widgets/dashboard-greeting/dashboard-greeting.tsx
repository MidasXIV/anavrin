import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { FC } from "react";

interface DashboardGreetingProps {
  userName: string;
  totalValue: number;
  totalInvestments: number;
}

const DashboardGreeting: FC<DashboardGreetingProps> = ({
  userName,
  totalValue,
  totalInvestments
}) => {
  const change =
    Number.parseFloat(totalValue.toString()) - Number.parseFloat(totalInvestments.toString());
  const percentageChange = (
    (change / Math.abs(Number.parseFloat(totalInvestments.toString()))) *
    100
  ).toFixed(2);

  return (
    <div className="px-3 py-10">
      <h2 className="mb-3 text-3xl font-semibold">Hello, {userName}!</h2>
      <p className="mb-4 text-gray-700">
        Welcome back to your financial dashboard. Here&apos;s a quick overview of your investments:
      </p>
      <div className="flex items-center text-lg">
        <div className="mr-2 text-right">{valueFormatter(totalValue)}</div>
        <div className={`text-left font-bold ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {change >= 0
            ? `+${valueFormatter(Math.abs(change))} (${percentageChange}%)`
            : `-${valueFormatter(Math.abs(change))} (${percentageChange}%)`}
        </div>
      </div>
    </div>
  );
};

export default DashboardGreeting;
