import { FC, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AssetType } from "lib/portfolio-utils";
import PortfolioOverviewCard from "../portfolio-overview-card/portfolio-overview-card";

interface IDashboardPortfolioSectionProps {
  portfolios: Portfolio[];
  onPortfolioSelect: (value) => void;
}

const DashboardPortfolioSection: FC<IDashboardPortfolioSectionProps> = ({
  portfolios,
  onPortfolioSelect
}) => {
  const [filterAsset, setFilterAsset] = useState("ALL");
  return (
    <section className="outline-test flex h-full w-full flex-col items-center justify-center overflow-hidden p-2">
      <div className="outline-test flex w-full items-center justify-between py-3">
        <span className="text-xl font-bold">Portfolios</span>
        <ToggleGroup
          type="single"
          onValueChange={selectGroupItem => {
            setFilterAsset(selectGroupItem);
          }}
        >
          <ToggleGroupItem key="ALL" value="ALL" className="text-xs">
            ALL
          </ToggleGroupItem>
          {Object.keys(AssetType).map(assetTypeKey => (
            <ToggleGroupItem key={assetTypeKey} value={AssetType[assetTypeKey]} className="text-xs">
              {AssetType[assetTypeKey].toUpperCase()}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="outline-test w-full">
        <section className="grid h-full auto-cols-[250px] grid-flow-col gap-3 overflow-auto p-2 pb-6">
          {portfolios
            .filter(portfolio => {
              if (filterAsset === "ALL") {
                return true;
              }
              return portfolio.assetType === filterAsset;
            })
            .map(portfolio => (
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
    </section>
  );
};

export default DashboardPortfolioSection;
