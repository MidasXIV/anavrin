import { FC } from "react";

const Card = ({ coin }) => {
  const currentPrice = coin.market_data.current_price.usd;
  const maxPrice =
    currentPrice > coin.market_data.high_24h.usd ? currentPrice : coin.market_data.high_24h.usd;
  const minPrice =
    currentPrice < coin.market_data.low_24h.usd ? currentPrice : coin.market_data.low_24h.usd;
  const currentPricePerc = ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="translucent-bg-charcoal-900 flex w-full flex-col justify-between rounded-lg p-4 text-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-2">
          <img className="mr-4 h-12 w-12 rounded-full" src={coin.image.large} alt={coin.name} />
          <div>
            <h2 className="text-lg font-medium">{coin.name}</h2>
            <p className="text-sm text-gray-300">{coin.symbol}</p>
          </div>
        </div>
        <span className="rounded-md border-2 border-gray-100 p-2 text-2xl font-bold">
          {coin.anavrin_score.toFixed(3)}
        </span>
      </div>
      <div className="mt-4 text-xs">
        <div className="flex justify-between">
          <div className="w-1/2 text-left text-gray-300">Current Price: {currentPrice} $</div>
          <div className="w-1/2 text-left text-gray-300">
            Change in 24h: {coin.market_data.price_change_percentage_24h} %
          </div>
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between text-gray-300">
            <p>Low in 24h: {minPrice} $</p>
            <p>High in 24h: {maxPrice} $</p>
          </div>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute h-full rounded-full bg-green-500"
              style={{
                width: `${currentPricePerc}%`
              }}
            />
            <div
              className="absolute bottom-0 top-0 w-1 rounded-full bg-black"
              style={{
                left: `${currentPricePerc}%`
              }}
            />
          </div>
        </div>

        <div className="mt-2 flex w-full border-gray-100 text-xs text-gray-100">
          <div className="flex  w-4/12 flex-col border-r-2 px-2 pl-0">
            <div className="mx-auto flex-1">{coin.coingecko_score}</div>
            <div className="mx-auto flex-1 font-semibold">Coingecko</div>
          </div>
          <div className="flex w-4/12 flex-col border-r-2 px-2">
            <div className="mx-auto flex-1">{coin.community_score}</div>
            <div className="mx-auto flex-1 font-semibold">Community</div>
          </div>
          <div className="flex w-4/12 flex-col border-r-2 px-2">
            <div className="mx-auto flex-1">{coin.developer_score}</div>
            <div className="mx-auto flex-1 font-semibold">Developer</div>
          </div>
          <div className="flex w-4/12 flex-col px-2 pr-0">
            <div className="mx-auto flex-1">{coin.public_interest_score}</div>
            <div className="mx-auto flex-1 font-semibold">Public Interest</div>
          </div>
        </div>
      </div>
    </div>
  );
};

type RankerProps = {
  items: Array<{
    id: string;
    name: string;
    symbol: string;
    anavrin_score: number;
  }>;
};

const VerticalRanker: FC<RankerProps> = ({ items }) => {
  const sortedItems = items.sort((a, b) => (a.anavrin_score < b.anavrin_score ? 1 : -1));
  console.log(sortedItems);
  return (
    <div className="flex flex-col space-y-4">
      {sortedItems.map((item, index) => (
        <Card key={`crypto-watchlist-item-${index + 1}`} coin={item} />
      ))}
    </div>
  );
};

export default VerticalRanker;
