import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import clsx from "clsx";
import { isCryptoPortfolioItem } from "../../lib/portfolio-asset-utils";
import { valueFormatter } from "../../utils/timeAndDateHelpers";

interface IPortfolioOverviewCardProps {
  portfolio: Portfolio;
  onPortfolioSelect: (value) => void;
  variant?: "compact" | "default"; // Define the variant prop
}

const PortfolioOverviewCard: FC<IPortfolioOverviewCardProps> = ({
  portfolio,
  onPortfolioSelect = value => {},
  variant = "default"
}) => {
  const totalInvestment = portfolio.items.reduce((acc, item) => acc + item.fiat, 0);
  return (
    <div
      role="button"
      className={clsx(
        "block h-full w-full overflow-hidden rounded-xl bg-charcoal-400 text-sm outline duration-300 hover:cursor-pointer hover:bg-charcoal-900 hover:shadow-xl",
        {
          "text-xs": variant === "compact"
        }
      )}
      onClick={() => onPortfolioSelect(portfolio._id)}
    >
      <div className="rounded-xl bg-gray-300">
        <h5
          className={clsx(
            "rounded-xl bg-gray-100 p-4 py-6 font-mono text-sm font-bold tracking-tight text-gray-800 shadow-md",
            {
              "text-xl": variant === "default"
            }
          )}
        >
          Portfolio
          <br />
          {portfolio._id}
          <p
            className={clsx("mt-2 text-sm text-gray-700", {
              "text-xs": variant === "compact"
            })}
          >
            Total investment: {valueFormatter(totalInvestment)}
          </p>
        </h5>
        <p
          className={clsx(" text-gray-800", {
            "px-4 py-2": variant === "compact",
            "px-4 py-6 pt-6": variant === "default"
          })}
        >
          Asset Type: {portfolio.assetType}
        </p>
      </div>

      <section className="px-4 py-2">
        <ScrollArea
          className={clsx({
            "h-[200px]": variant === "default",
            "h-[120px]": variant === "compact"
          })}
        >
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
