import { FC } from "react";
import PortfolioOverviewCard from "../portfolio-overview-card/portfolio-overview-card";

interface IDashboardPortfolioSectionProps {
  portfolios: Portfolio[];
  onPortfolioSelect: (value) => void;
}

const DashboardPortfolioSection: FC<IDashboardPortfolioSectionProps> = ({
  portfolios,
  onPortfolioSelect
}) => (
  <section className="flex h-full w-full items-center justify-center">
    <div className="flex w-full grid-cols-4 flex-col gap-3 lg:grid">
      <div className="col-span-3 max-w-full">
        <section className="grid h-full auto-cols-[250px] grid-flow-col gap-3">
          {portfolios.map(portfolio => (
            <PortfolioOverviewCard
              key={portfolio._id}
              portfolio={portfolio}
              onPortfolioSelect={onPortfolioSelect}
              variant="compact"
            />
          ))}
          {portfolios.map(portfolio => (
            <PortfolioOverviewCard
              key={portfolio._id}
              portfolio={portfolio}
              onPortfolioSelect={onPortfolioSelect}
              variant="compact"
            />
          ))}
          {portfolios.map(portfolio => (
            <PortfolioOverviewCard
              key={portfolio._id}
              portfolio={portfolio}
              onPortfolioSelect={onPortfolioSelect}
              variant="compact"
            />
          ))}
          {portfolios.map(portfolio => (
            <PortfolioOverviewCard
              key={portfolio._id}
              portfolio={portfolio}
              onPortfolioSelect={onPortfolioSelect}
              variant="compact"
            />
          ))}
        </section>
      </div>
    </div>
  </section>
);

export default DashboardPortfolioSection;
