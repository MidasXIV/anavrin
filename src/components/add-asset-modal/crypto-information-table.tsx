import { FC } from "react";

const CryptoInformationTable: FC<any> = ({ coin }) => (
  <div className="rounded-sm bg-gray-100 py-2 px-2 text-gray-600">
    <div className="flex items-center py-2">
      <img className="mr-4 h-12 w-12 rounded-full" src={coin.image.large} alt={coin.name} />
      <div>
        <h2 className="text-lg font-medium">{coin.name}</h2>
        <p className="text-sm text-gray-300">{coin.symbol}</p>
      </div>
    </div>
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">Market Cap</div>
        <div className="flex-1 px-3 text-right">{coin.market_data.market_cap.usd} $</div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">Current Price</div>
        <div className="flex-1 pl-3 text-right">{coin.market_data.current_price.usd}</div>
      </div>
    </div>
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">Change in 24h</div>
        <div className="flex-1 px-3 text-right">
          {coin.market_data.price_change_percentage_24h.toFixed(2)} %
        </div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">Anavrin Score</div>
        <div className="flex-1 pl-3 text-right">{coin.anavrin_score.toFixed(2)}</div>
      </div>
    </div>
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">Coingecko Score</div>
        <div className="px-3 text-right">{coin.coingecko_score ?? 0}</div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">Community Score</div>
        <div className="pl-3 text-right">{coin.community_score}</div>
      </div>
    </div>
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">Developer Score</div>
        <div className="px-3 text-right">{coin.developer_score}</div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">Public Interest Score</div>
        <div className="pl-3 text-right">{coin.public_interest_score}</div>
      </div>
    </div>
  </div>
);

export default CryptoInformationTable;
