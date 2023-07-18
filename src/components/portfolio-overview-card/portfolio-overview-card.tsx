import { ScrollArea, Divider } from "@mantine/core";
import { FC } from "react";
import { isCryptoPortfolioItem } from "../../lib/portfolio-asset-utils";

interface IPortfolioOverviewCardProps {
  portfolio: Portfolio;
}

const PortfolioOverviewCard: FC<IPortfolioOverviewCardProps> = ({ portfolio }) => {
  const totalInvestment = portfolio.items.reduce((acc, item) => acc + item.fiat, 0);
  return (
    <div className="block h-full w-full rounded-md border border-gray-200 bg-charcoal-400 p-6 text-sm hover:bg-charcoal-900">
      <h5 className="mb-2 font-mono text-xl font-bold tracking-tight text-white">
        Portfolio {portfolio._id}
      </h5>
      <p className="my-2 text-gray-400">Asset Type: {portfolio.assetType}</p>
      <ScrollArea h={200} offsetScrollbars scrollbarSize={4}>
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

      <Divider my="sm" />
      <p className="my-2 text-gray-400">Total investment: {totalInvestment}</p>
    </div>
  );
};

export default PortfolioOverviewCard;
