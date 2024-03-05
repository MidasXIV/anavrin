import BarChartWrapper from "@/components/charting/bar-chart/bar-chart";
import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { FC } from "react";

import { CategoryBar, Legend, Metric, Text } from "@tremor/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Card from "../Card/card";

interface DashboardGreetingProps {
  userName: string;
  totalValue: number;
  totalInvestments: number;
}

const Stuff = () => (
  <>
    <CategoryBar
      className="my-4"
      values={[6724, 3621, 450]}
      colors={["emerald", "red", "yellow"]}
      showLabels={false}
    />

    {/* <Legend
      className="mt-3"
      categories={["Active users", "Inactive users"]}
      colors={["emerald", "red"]}
    /> */}
    {/* <div className="flex flex-col text-xs">
      <ScrollArea className="h-[75px]">
        {[
          { tooltip: "Stock", value: 6724, composition: 25 },
          { tooltip: "Crypto", value: 3621, composition: 23 },
          { tooltip: "DFM", value: 450, composition: 5 }
        ].map((dataItem, index) => (
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
    </div> */}

    <div className="grid grid-cols-3 grid-rows-1 gap-1">
      {[
        { tooltip: "Stock", value: 6724, composition: 25 },
        { tooltip: "Crypto", value: 3621, composition: 23 },
        { tooltip: "DFM", value: 450, composition: 5 }
      ].map((dataItem, index) => (
        <div
          key={`ring-chart-data-item-${index + 1}`}
          className="flex h-full w-full flex-col justify-center px-2 py-1 font-chakra text-sm"
        >
          <div className="inline-flex items-center">
            <div className="h-2 w-2 rounded-full bg-indigo-200 leading-none" />
            <span className="ml-2 text-gray-300">{dataItem.tooltip}</span>
          </div>
          <div className="text-xs">
            <span className="text-left text-gray-500">{valueFormatter(dataItem.value)}</span>
            <span className="inline-flex items-center justify-center px-2 py-1 leading-none text-gray-500">
              ({dataItem.composition} %)
            </span>
          </div>
        </div>
      ))}
    </div>
  </>
);
const DefaultCard = () => (
  <Card showHeader headerTitle="Stats">
    <div className="h-full w-full p-4 font-chakra">
      <Text>Total Net Worth</Text>
      <h3 className="text-4xl">$ 10,483</h3>
      <Stuff />
    </div>
  </Card>
);

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
    <div className="rounded-b-xl bg-charcoal-400 px-6 py-6 text-gray-200 shadow-lg sm:bg-transparent sm:py-4 sm:text-charcoal-400">
      {/* <div className="rounded-xl border border-gray-400 bg-charcoal-400 px-3 py-6 text-gray-200 sm:bg-[#eaeaea] sm:py-10 sm:text-charcoal-400"> */}
      <h2 className="mb-3 hidden text-4xl font-semibold sm:block">{userName}!</h2>
      {/* <h2 className="mb-6 text-2xl font-semibold sm:hidden">
        {userName}
        <br />
        <p className="mb-4 text-lg text-gray-500">welcome back</p>
      </h2> */}
      <p className="mb-4 hidden text-gray-700 sm:block">
        Welcome back to your financial dashboard. Here&apos;s a quick overview of your investments:
      </p>
      <div className="flex items-center justify-between font-chakra text-sm font-semibold">
        <h1 className="text-sm text-gray-500">Total Net Worth</h1>
        <div className={`text-left ${change >= 0 ? "text-green-200" : "text-red-200"}`}>
          {change >= 0
            ? `+${valueFormatter(Math.abs(change))} (${percentageChange}%)`
            : `-${valueFormatter(Math.abs(change))} (${percentageChange}%)`}
        </div>
      </div>
      <div className="py-4 font-chakra text-5xl leading-none">{valueFormatter(totalValue)}</div>
      {/* <div className="flex items-center text-lg">
        <div className="mr-2 text-right">{valueFormatter(totalValue)}</div>
        <div className={`text-left font-bold ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {change >= 0
            ? `+${valueFormatter(Math.abs(change))} (${percentageChange}%)`
            : `-${valueFormatter(Math.abs(change))} (${percentageChange}%)`}
        </div>
      </div> */}
      {/* <div className="h-5 w-full">
        <BarChartWrapper
          title="ddd"
          colors={["rose", "yellow", "pink", "emrald"]}
          stack
          layout="vertical"
          data={[
            {
              date: "Jan 23",
              "2022": 45,
              "2023": 78
            }
          ]}
          showYAxis={false}
          showXAxis={false}
          index="date"
          categories={["2022", "2023"]}
        />
      </div> */}
      {/* <CategoryBar
        className="mt-4"
        values={[6724, 3621, 450]}
        colors={["emerald", "red", "yellow"]}
        showLabels={false}
      />
      <Legend
        className="mt-3 inline-flex w-full justify-end"
        categories={["Stock", "Crypto", "DFM"]}
        colors={["emerald", "red", "yellow"]}
      /> */}
      <Stuff />
      {/* <DefaultCard /> */}
    </div>
  );
};

export default DashboardGreeting;
