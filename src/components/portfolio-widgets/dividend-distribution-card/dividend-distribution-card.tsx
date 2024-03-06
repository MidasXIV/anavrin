/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import BarChartWrapper from "@/components/charting/bar-chart/bar-chart";
import Card from "../Card/card";
import DividendDistributionBlock from "../portfolio-dividend-distribution-block";

interface DividendDistributionData {
  [month: string]: Array<{
    symbol: string;
    dividendAmount: number;
  }>;
}

interface BarChartData {
  month: string;
  dividends: number;
}

const aggregateDividendsByMonth = (data: DividendDistributionData): BarChartData[] => {
  const barChartData: BarChartData[] = [];

  for (const month in data) {
    const dividendsForMonth = data[month];
    const totalDividends = dividendsForMonth.reduce((sum, entry) => sum + entry.dividendAmount, 0);

    barChartData.push({
      month,
      dividends: totalDividends
    });
  }

  return barChartData;
};

const DividendDistributionCard = ({ data }) => {
  const barChartData = aggregateDividendsByMonth(data);

  return (
    <Card
      showHeader
      showFooter
      customFooter
      headerTitle="Dividend distribution"
      footer={
        <Accordion type="single" collapsible className="rounded-xl bg-transparent text-xs">
          <AccordionItem value="item-1">
            <AccordionTrigger className="border-0 px-4 py-2 text-sm font-semibold">
              view more
            </AccordionTrigger>
            <AccordionContent className="rounded-xl text-xs">
              <section className="space-y-4">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {Object.keys(data).map(key => (
                    <DividendDistributionBlock key={key} month={key} distribution={data[key]} />
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
            data={barChartData}
            index="month"
            categories={["dividends"]}
            colors={["blue"]}
          />
        </div>
      </div>
    </Card>
  );
};

export default DividendDistributionCard;
