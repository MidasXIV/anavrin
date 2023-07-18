import { FC } from "react";
import { useResizeObserver } from "@mantine/hooks";
import { ScrollArea, Box } from "@mantine/core";
import PortfolioDiversificationCard from "../portfolio-diversification-card/portfolio-diversification-card";
import PortfolioOverviewCard from "../portfolio-overview-card/portfolio-overview-card";

interface IDashboardPortfolioSectionProps {
  portfolios: Portfolio[];
}

const DashboardPortfolioSection: FC<IDashboardPortfolioSectionProps> = ({ portfolios }) => {
  const [ref, size] = useResizeObserver();
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex w-full grid-cols-4 flex-col gap-3 px-6 lg:grid">
        <div className="col-span-3 max-w-full" ref={ref}>
          <ScrollArea w={size} className="h-full">
            <Box
              className="grid h-full auto-cols-[333px] grid-flow-col gap-3"
              w={size}
              sx={{ height: "inherit" }}
            >
              {portfolios.map(portfolio => (
                <PortfolioOverviewCard key={portfolio._id} portfolio={portfolio} />
              ))}
            </Box>
          </ScrollArea>
        </div>
        <div className="col-span-1 max-w-full">
          <div className="grid h-full w-full max-w-full grid-cols-2 gap-3 lg:grid-cols-none lg:grid-rows-2">
            <PortfolioDiversificationCard portfolios={portfolios} />
            <div className="block h-full w-full rounded-md border border-gray-200 bg-charcoal-400 p-6 text-sm hover:bg-charcoal-900">
              {/* <Button onClick={() => setHide(!hide)}>Transistion</Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPortfolioSection;
