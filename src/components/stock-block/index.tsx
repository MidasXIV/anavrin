import { FC } from "react";

const StockBlock: FC = () => (
  <div className="flex w-full md:max-w-sm p-10 bg-gray-100 text-gray-600 items-center rounded shadow-xl overflow-hidden">
    <div className="w-full">
      <h3 className="text-lg font-semibold leading-tight text-gray-800">Apple Inc.</h3>
      <h6 className="text-sm leading-tight mb-2">
        <span>AAPL</span>
        &nbsp;&nbsp;-&nbsp;&nbsp; October 30 4:00PM EDT
      </h6>
      <div className="flex w-full items-end mb-6">
        <span className="block leading-none text-3xl text-gray-800">108.86</span>
        <span className="block leading-5 text-sm ml-4 text-green-500">
          {`${115.32 - 108.86 < 0 ? "▼" : "▲"} ${(115.32 - 108.86).toFixed(3)} (${(
            (115.32 / 108.86) * 100 -
            100
          ).toFixed(3)}%)`}
        </span>
      </div>
      <div className="flex w-full text-xs">
        <div className="flex w-5/12">
          <div className="flex-1 pr-3 text-left font-semibold">Open</div>
          <div className="flex-1 px-3 text-right">0</div>
        </div>
        <div className="flex w-7/12">
          <div className="flex-1 px-3 text-left font-semibold">Market Cap</div>
          <div className="flex-1 pl-3 text-right">0</div>
        </div>
      </div>
      <div className="flex w-full text-xs">
        <div className="flex w-5/12">
          <div className="flex-1 pr-3 text-left font-semibold">High</div>
          <div className="px-3 text-right">0</div>
        </div>
        <div className="flex w-7/12">
          <div className="flex-1 px-3 text-left font-semibold">P/E ratio</div>
          <div className="pl-3 text-right">0</div>
        </div>
      </div>
      <div className="flex w-full text-xs">
        <div className="flex w-5/12">
          <div className="flex-1 pr-3 text-left font-semibold">Low</div>
          <div className="px-3 text-right">0</div>
        </div>
        <div className="flex w-7/12">
          <div className="flex-1 px-3 text-left font-semibold">Dividend yield</div>
          <div className="pl-3 text-right">0%</div>
        </div>
      </div>
    </div>
  </div>
);

export default StockBlock;
