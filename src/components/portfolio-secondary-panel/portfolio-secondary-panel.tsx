import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mockDividendDistributionData from "tests/mocks/dividend-distribution-data-1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import Card from "../portfolio-widgets/Card/card";
import InfoIcon from "../icons/InfoIcon";
import RingChart from "../charting/ring-chart/ring-chart";
import { ScrollArea } from "../ui/scroll-area";
import BarChartWrapper from "../charting/bar-chart/bar-chart";
import DividendDistributionBlock from "../portfolio-widgets/portfolio-dividend-distribution-block";
import AssetsComparisionGrowthChart from "../portfolio-widgets/assets-comparision-growth-chart/assets-comparision-growth-chart";
import CostMarketValueChart from "../portfolio-widgets/cost-market-value-chart/cost-market-value-chart";
import AssetsDividendYieldChart from "../portfolio-widgets/assets-dividend-yield-chart/assets-dividend-yield-chart";

const PortfolioLayoutSecondaryPanel = ({
  portfolioType,
  ringChartData,
  dividendIncome,
  portfolioDividendYield,
  costMarketValueChartData,
  assetsComparisionGrowthChartData,
  portfolioDividendEfficiency,
  dividendDistributionRingChartData,
  dividendYieldOnCostData
}) => {
  const ad = 3 + 5;
  return (
    <section className="flex h-full w-full flex-col">
      <Tabs
        defaultValue="analytics"
        // onValueChange={handleTabChange}
        className="flex h-full flex-col"
      >
        <TabsList className="w-full bg-charcoal-900">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="dividends">Dividends</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent key="analytics-panel" value="analytics" className="h-full">
          <section className="flex h-full w-full flex-col">
            <section className="flex h-72 w-full flex-row sm:h-1/2">
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
                  <div className="h-full w-full overflow-auto">
                    <div className="h-[65%] w-full px-10">
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
                  </div>
                </Card>
              </div>
            </section>
            <section className="flex h-72 w-full flex-row sm:h-1/2">
              <div className="h-full w-1/2 p-1">
                <Card showHeader headerTitle="Cost and Market value">
                  <div className="h-full w-full p-2">
                    <CostMarketValueChart data={costMarketValueChartData} />
                  </div>
                </Card>
              </div>
              <div className="h-full w-1/2 p-1">
                <Card showHeader headerTitle="Growth">
                  <div className="h-full w-full p-2">
                    <AssetsComparisionGrowthChart data={assetsComparisionGrowthChartData} />
                  </div>
                </Card>
              </div>
            </section>
          </section>
        </TabsContent>
        <TabsContent key="dividends-panel" value="dividends" className="h-full">
          <ScrollArea className="h-[36rem] min-h-full">
            <section className="flex h-full max-h-full w-full flex-col overflow-auto">
              <section className="flex h-72 w-full flex-row">
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
                            <button
                              type="button"
                              className="rounded-lg px-2 py-1 hover:bg-gray-200"
                            >
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
                            <button
                              type="button"
                              className="rounded-lg px-2 py-1 hover:bg-gray-200"
                            >
                              <InfoIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="h-full w-full p-1">
                  <Card showHeader headerTitle="Dividend breakdown">
                    <div className="flex h-full w-full flex-col">
                      <div className="flex h-full w-full flex-col justify-between p-1 px-2">
                        <span className="font-sans text-3xl font-bold text-gray-900">
                          {valueFormatter(dividendIncome / 12)}
                        </span>
                        <div className="inline-flex justify-between py-1 text-xs font-semibold text-gray-800">
                          <span>
                            Monthly average
                            <br />
                            dividend
                          </span>
                          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                            <InfoIcon />
                          </button>
                        </div>
                      </div>

                      <div className="border-1 border-success flex h-full w-full flex-col justify-between border-r-2 border-t-2 p-1 px-2">
                        <div className="font-sans text-2xl font-bold text-gray-900">
                          {valueFormatter(dividendIncome / 52)}
                        </div>
                        <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                          <span>
                            Weekly average
                            <br />
                            dividend
                          </span>
                          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                            <InfoIcon />
                          </button>
                        </div>
                      </div>
                      <div className="border-1 border-success flex h-full w-full flex-col justify-between border-t-2 p-1 px-2">
                        <div className="font-sans text-2xl font-bold text-gray-900">
                          {valueFormatter(dividendIncome / 365)}
                        </div>
                        <div className="inline-flex justify-between py-1  text-xs  font-semibold text-gray-800">
                          <span>
                            Daily average
                            <br />
                            dividend
                          </span>
                          <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                            <InfoIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
              <section className="min-h-[20rem] w-full p-1">
                <Card
                  showHeader
                  showFooter
                  customFooter
                  headerTitle="Dividend distribution"
                  footer={
                    <Accordion
                      type="single"
                      collapsible
                      className="rounded-xl bg-transparent text-xs"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="border-0 px-4 py-2 text-sm font-semibold">
                          view more
                        </AccordionTrigger>
                        <AccordionContent className="rounded-xl text-xs">
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
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  }
                >
                  <div className="h-full w-full">
                    <Tabs
                      defaultValue="monthly"
                      // onValueChange={handleTabChange}
                      className="flex h-fit flex-col"
                    >
                      <TabsList className="">
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="quaterly">Quaterly</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="my-3 h-44 w-full">
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
                  </div>
                </Card>
              </section>
              <section className="flex h-72 w-full flex-row">
                <div className="h-full w-full p-1">
                  <Card showHeader headerTitle="Dividend yield on cost">
                    <div className="h-full w-full p-2">
                      <AssetsDividendYieldChart data={dividendYieldOnCostData} />
                    </div>
                  </Card>
                </div>
                <div className="h-full w-full p-1">
                  <Card showHeader headerTitle="Dividends per stock">
                    <div className="h-full w-full overflow-auto">
                      <div className="h-[65%] w-full px-10">
                        <RingChart
                          sections={dividendDistributionRingChartData}
                          valueFormatterOverride={valueFormatter}
                          category="value"
                          index="tooltip"
                        />
                      </div>
                      <div className="flex flex-col text-xs">
                        <ScrollArea className="h-[75px]">
                          {dividendDistributionRingChartData.map(
                            (dividendDistributionRingChartDataItem, index) => (
                              <div
                                key={`ring-chart-data-item-${index + 1}`}
                                className="border-1 flex w-full justify-between border-b border-gray-300 px-2 py-1"
                              >
                                <div className="inline-flex w-1/3">
                                  <div className="h-4 w-4 rounded-full bg-indigo-700 leading-none" />
                                  <span className="ml-2 font-bold text-gray-800">
                                    {dividendDistributionRingChartDataItem.tooltip}
                                  </span>
                                </div>

                                <span className="w-1/3 text-left font-medium text-gray-500">
                                  {valueFormatter(dividendDistributionRingChartDataItem.value)}
                                </span>
                                <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-tiny leading-none text-red-100">
                                  {dividendDistributionRingChartDataItem.composition} %
                                </span>
                              </div>
                            )
                          )}
                        </ScrollArea>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            </section>
          </ScrollArea>
        </TabsContent>
        <TabsContent key="notes-panel" value="notes" className="flex-1">
          Notes{" "}
        </TabsContent>
        <TabsContent key="chat-panel" value="chat" className="flex-1">
          Chat{" "}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PortfolioLayoutSecondaryPanel;
