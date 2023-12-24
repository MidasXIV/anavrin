import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mockDividendDistributionData from "tests/mocks/dividend-distribution-data-1";
import Card from "../portfolio-widgets/Card/card";
import InfoIcon from "../icons/InfoIcon";
import RingChart from "../charting/ring-chart/ring-chart";
import { ScrollArea } from "../ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import BarChartWrapper from "../charting/bar-chart/bar-chart";
import DividendDistributionBlock from "../portfolio-widgets/portfolio-dividend-distribution-block";
import { Button } from "../ui/button";

const PortfolioLayoutSecondaryPanel = ({
  portfolioType,
  ringChartData,
  dividendIncome,
  portfolioDividendYield,
  portfolioDividendEfficiency
}) => {
  const ad = 3 + 5;
  return (
    <>
      <section className="flex h-full max-h-72 w-full flex-row">
        <div className="h-full w-full p-1">
          <Card showHeader headerTitle="Dividend analysis">
            <div className="flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col justify-between p-1 px-2">
                <span className="font-sans text-3xl font-bold text-gray-900">
                  {valueFormatter(dividendIncome)}
                </span>
                <div className="inline-flex justify-between py-1 text-xs font-semibold text-gray-800">
                  <span>
                    Annual
                    <br />
                    dividends
                  </span>
                  <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                    <InfoIcon />
                  </button>
                </div>
              </div>
              <div className="flex h-full w-full flex-row">
                <div className="border-1 border-success flex h-full w-full flex-col justify-between border-r-2 border-t-2 p-1 px-2">
                  <div className="font-sans text-2xl font-bold text-gray-900">
                    {portfolioDividendYield}%
                  </div>
                  <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                    <span>Dividend yield</span>
                    <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                      <InfoIcon />
                    </button>
                  </div>
                </div>
                <div className="border-1 border-success flex h-full w-full flex-col justify-between border-t-2 p-1 px-2">
                  <div className="font-sans text-2xl font-bold text-gray-900">
                    {portfolioDividendEfficiency}%
                  </div>
                  <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                    <span>Dividend efficiency</span>
                    <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                      <InfoIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="h-full w-full p-1">
          <Card showHeader headerTitle="Portfolio breakdown">
            <div className="px-10">
              <RingChart
                sections={ringChartData}
                valueFormatterOverride={valueFormatter}
                category="value"
                index="tooltip"
              />
            </div>
            <div className="flex flex-col text-xs">
              <ScrollArea className="h-[75px]">
                {ringChartData.map((ringChartDataItem, index) => (
                  <div
                    key={`ring-chart-data-item-${index + 1}`}
                    className="border-1 flex w-full justify-between border-b border-gray-300 px-2 py-1"
                  >
                    <div className="inline-flex w-1/3">
                      <div className="h-4 w-4 rounded-full bg-indigo-700 leading-none" />
                      <span className="ml-2 font-bold text-gray-800">
                        {ringChartDataItem.tooltip}
                      </span>
                    </div>

                    <span className="w-1/3 text-left font-medium text-gray-500">
                      {valueFormatter(ringChartDataItem.value)}
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-tiny leading-none text-red-100">
                      {ringChartDataItem.composition} %
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </Card>
        </div>
      </section>
      <section className="flex w-full flex-row">
        <div className="h-full w-full p-1">
          <Card
            showHeader
            showFooter
            customFooter
            headerTitle="Dividend distribution"
            footer={
              <Collapsible className="rounded-xl bg-transparent text-xs">
                <CollapsibleTrigger className="flex w-full items-center justify-between space-x-4 rounded-b-xl px-4 hover:bg-gray-200">
                  <h4 className="text-sm font-semibold">view more</h4>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="rounded-xl text-xs">
                  <section className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {Object.keys(mockDividendDistributionData).map(key => (
                        <DividendDistributionBlock
                          key={key}
                          month={key}
                          distribution={mockDividendDistributionData[key]}
                        />
                      ))}
                    </div>
                  </section>
                </CollapsibleContent>
              </Collapsible>
            }
          >
            <Tabs
              defaultValue="monthly"
              // onValueChange={handleTabChange}
              className="flex h-full flex-col"
            >
              <TabsList className="">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">Annually</TabsTrigger>
                <TabsTrigger value="quaterly">Quaterly</TabsTrigger>
              </TabsList>
            </Tabs>
            {/* bar chartt */}
            <div className="h-44 w-full p-2">
              <BarChartWrapper
                title="Dividends in year"
                data={[
                  {
                    month: "January",
                    dividends: 300
                  },
                  {
                    month: "February",
                    dividends: 600
                  },
                  {
                    month: "March",
                    dividends: 400
                  },
                  {
                    month: "April",
                    dividends: 400
                  },
                  {
                    month: "May",
                    dividends: 400
                  },
                  {
                    month: "June",
                    dividends: 800
                  },
                  {
                    month: "July",
                    dividends: 400
                  },
                  {
                    month: "August",
                    dividends: 500
                  },
                  {
                    month: "September",
                    dividends: 600
                  },
                  {
                    month: "October",
                    dividends: 100
                  },
                  {
                    month: "November",
                    dividends: 200
                  },
                  {
                    month: "December",
                    dividends: 250
                  }
                ]}
                index="month"
                categories={["dividends"]}
                colors={["blue"]}
              />
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default PortfolioLayoutSecondaryPanel;
