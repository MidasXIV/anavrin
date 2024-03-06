import { FC } from "react";
import { clsx } from "clsx";

const CryptoInformationTable: FC<any> = ({ coin }) => (
  <div className="flex flex-row rounded-sm bg-gray-100 px-2 py-2 text-gray-600">
    <div className="flex w-5/12 flex-col">
      <div className="flex items-center">
        <img className="mr-4 h-12 w-12 rounded-full" src={coin.image.large} alt={coin.name} />
        <div>
          <h2 className="text-lg font-medium">{coin.name}</h2>
          <p className="text-sm text-gray-600">{coin.symbol}</p>
        </div>
      </div>
    </div>

    <div className="w-7/12">
      <div className="flex w-full text-xs">
        <div className="flex-1 px-3 text-left font-semibold">Market Cap</div>
        <div className="flex-1 pl-3 text-right">{coin.market_data.market_cap.usd} $</div>
      </div>
      <div className="flex w-full text-xs">
        <div className="flex-1 px-3 text-left font-semibold">Price</div>
        <div className="flex-1 pl-3 text-right">
          {coin.market_data.current_price.usd}
          <span
            className={clsx({
              "text-green-500": coin.market_data.price_change_percentage_24h >= 0,
              "text-red-500": coin.market_data.price_change_percentage_24h < 0
            })}
          >
            {" "}
            {coin.market_data.price_change_percentage_24h < 0 ? "▼" : "▲"}{" "}
            {coin.market_data.price_change_percentage_24h?.toFixed(1) ?? 0} %
          </span>
        </div>
      </div>
      <div className="flex w-full text-xs">
        <div className="flex-1 px-3 text-left font-semibold">Anavrin Score</div>
        <div className="flex-1 pl-3 text-right">{coin.anavrin_score.toFixed(2)}</div>
      </div>
      <div className="flex w-full text-xs">
        <div className="flex-1 px-3 text-left font-semibold">Coingecko Score</div>
        <div className="flex-1 pl-3 text-right">{coin.coingecko_score ?? 0}</div>
      </div>
      <div className="flex w-full text-xs">
        <div className="flex-1 px-3 text-left font-semibold">Community Score</div>
        <div className="pl-3 text-right">{coin.community_score}</div>
      </div>
    </div>
  </div>
);

export default CryptoInformationTable;
