import { FC } from "react";

const StockInformationTable: FC<any> = ({ stock }) => (
  <div className="bg-gray-50 py-2 px-2 text-gray-600">
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">Dividend</div>
        <div className="flex-1 px-3 text-right">{stock?.dividendAmount || 0}</div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">Payout Ratio</div>
        <div className="flex-1 pl-3 text-right">{stock?.dividendPayoutRatio?.toFixed(3) || 0}</div>
      </div>
    </div>
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">Price</div>
        <div className="flex-1 px-3 text-right">{stock?.price || 0}</div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">Market Cap</div>
        <div className="flex-1 pl-3 text-right">{stock?.marketCap || 0}</div>
      </div>
    </div>
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">beta</div>
        <div className="px-3 text-right">{stock?.beta || 0}</div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">P/E ratio</div>
        <div className="pl-3 text-right">{stock?.peRatio || 0}</div>
      </div>
    </div>
    <div className="flex w-full text-xs">
      <div className="flex w-5/12">
        <div className="flex-1 pr-3 text-left font-semibold">EPS</div>
        <div className="px-3 text-right">{stock?.EPS || 0}</div>
      </div>
      <div className="flex w-7/12">
        <div className="flex-1 px-3 text-left font-semibold">Dividend yield</div>
        <div className="pl-3 text-right">{stock?.dividendYield || "0%"}</div>
      </div>
    </div>
  </div>
);

export default StockInformationTable;
