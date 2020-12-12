import { FC, useEffect, useState } from "react";
import cn from "classnames";
import getStockInformation from "../../util/getStockInformation";
import useStockInformation from "../../hooks/useStockInformation";
import StockSearchCombobox from "../stock-search-combobox";
import useStockSearch from "../../hooks/useStockSearch";

type AddStockModalProps = {
  isShowing: boolean;
  cancel: () => void;
};

const AddStockModal: FC<AddStockModalProps> = ({ isShowing, cancel }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticker, setTicker] = useState("");
  // const { stock, isLoading, isError } = useStockInformation(ticker || null);
  const { stock, isLoading, isError } = useStockInformation(null);
  const { stockSuggestions, _isLoading, _isError } = useStockSearch(ticker || null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("Setting Ticker");
      setTicker(searchTerm);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div
      className={cn("fixed px-4 md:flex md:items-center md:justify-center z-10 inset-0", {
        hidden: !isShowing,
        "md:hidden": !isShowing
      })}
    >
      <div
        className="bg-black opacity-75 w-full absolute z-10 inset-0"
        onClick={cancel}
        onKeyDown={cancel}
        aria-hidden="true"
      />
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
        <div className="px-2 py-5 sm:px-6 flex flex-col">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Stock Information</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm py-2 px-4 font-semibold bg-charcoal-400 text-gray-400 rounded-md">
                Ticker
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 rounded-md flex flex-row relative">
                <StockSearchCombobox
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  stockSuggestions={stockSuggestions}
                />
              </dd>
            </div>
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-gray-600">
              <dt className="text-sm py-2 px-4 font-semibold bg-charcoal-400 text-gray-400 rounded-md">
                Shares
              </dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 rounded-md">
                <input
                  type="number"
                  name="shares"
                  id="modal_input_shares"
                  min="0"
                  className="bg-gray-300 w-full text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                />
              </dd>
            </div>
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-gray-600">
              <dt className="text-sm py-2 px-4 font-semibold bg-charcoal-400 text-gray-400 rounded-md">
                Buy Price
              </dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 rounded-md">
                <input
                  type="number"
                  name="market_price"
                  id="modal_input_market_price"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  className="bg-gray-300 w-full text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                />
              </dd>
            </div>
            <div className="bg-gray-50 py-2 px-6 text-gray-600">
              <div className="flex w-full text-xs">
                <div className="flex w-5/12">
                  <div className="flex-1 pr-3 text-left font-semibold">Dividend</div>
                  <div className="flex-1 px-3 text-right">{stock?.dividendAmount || 0}</div>
                </div>
                <div className="flex w-7/12">
                  <div className="flex-1 px-3 text-left font-semibold">Payout Ratio</div>
                  <div className="flex-1 pl-3 text-right">
                    {stock?.dividendPayoutRatio.toFixed(3) || 0}
                  </div>
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
                  <div className="pl-3 text-right">{stock?.dividendYeild || "0%"}</div>
                </div>
              </div>
            </div>
          </dl>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            type="button"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          >
            Add Stock
          </button>
          <button
            type="button"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;

// reference
/* https://tailwindcomponents.com/component/modal
   https://codepen.io/iamsahilvhora/pen/LYYxQJw */
