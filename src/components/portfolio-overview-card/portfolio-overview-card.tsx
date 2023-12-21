import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { isCryptoPortfolioItem } from "../../lib/portfolio-asset-utils";
import { valueFormatter } from "../../utils/timeAndDateHelpers";

interface IPortfolioOverviewCardProps {
  portfolio: Portfolio;
  onPortfolioSelect: (value) => void;
}

const PortfolioOverviewCard: FC<IPortfolioOverviewCardProps> = ({
  portfolio,
  onPortfolioSelect = value => {}
}) => {
  const totalInvestment = portfolio.items.reduce((acc, item) => acc + item.fiat, 0);
  return (
    <div
      role="button"
      className="block h-full w-full overflow-hidden rounded-xl bg-charcoal-400 text-sm outline duration-300 hover:scale-105 hover:transform hover:cursor-pointer hover:bg-charcoal-900 hover:shadow-xl"
      onClick={() => onPortfolioSelect(portfolio._id)}
    >
      <div className="rounded-xl bg-gray-300">
        <h5 className="rounded-xl bg-gray-100 p-4 py-6 font-mono text-xl font-bold tracking-tight text-gray-800 shadow-md">
          Portfolio {portfolio._id}
          <p className="mt-2 text-sm text-gray-700">
            Total investment: {valueFormatter(totalInvestment)}
          </p>
        </h5>
        <p className="px-4 py-6 pt-6 text-gray-800">Asset Type: {portfolio.assetType}</p>
      </div>

      <section className="px-4 py-2">
        <ScrollArea className="h-[200px]">
          {portfolio.items.map((item, index) => (
            <div key={`portfolio-item-${index + 1}`} className="mb-4">
              <p className="font-medium text-white">
                {isCryptoPortfolioItem(item) ? item.token : item.ticker}
              </p>
              <p className="text-gray-400">
                Holdings: {isCryptoPortfolioItem(item) ? item.holdings : item.shares}{" "}
                {isCryptoPortfolioItem(item) ? item.token : item.ticker}
              </p>
              <p className="text-gray-400">Fiat Value: {item.fiat} USD</p>
            </div>
          ))}
        </ScrollArea>
      </section>
    </div>
  );
};

export default PortfolioOverviewCard;
