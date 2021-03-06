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

enum SearchState {
  STABLE = "STABLE",
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILURE = "FAILURE"
}

const StockInformationTable = ({ stock }) => (
  <div className="bg-gray-50 py-2 px-6 text-gray-600">
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
        <div className="pl-3 text-right">{stock?.dividendYeild || "0%"}</div>
      </div>
    </div>
  </div>
);

const UtilityFooter = () => (
  <dl className="p-2 text-xs border-t border-gray-200 hidden sm:flex flex-row justify-between">
    <dt className="flex flex-row items-center space-x-2">
      <kbd className="bg-charcoal-400 p-2 rounded-md text-sm text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4"
        >
          <path
            fillRule="evenodd"
            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </kbd>
      <kbd className="bg-charcoal-400 p-2 rounded-md text-sm text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4"
        >
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </kbd>
      <p>to navigate.</p>
    </dt>
    <dt className="flex flex-row items-center space-x-2">
      <kbd className="bg-charcoal-400 py-1 px-3 rounded-md text-sm text-gray-300">ENTER</kbd>
      <p>to select.</p>
    </dt>
    <dt className="flex flex-row items-center space-x-2">
      <kbd className="bg-charcoal-400 py-1 px-3 rounded-md text-sm text-gray-300">ESC</kbd>
      <p>to cancel.</p>
    </dt>
  </dl>
);

const ButtonPanel = ({ cancel, formState, formValid }) => (
  // <div className="text-center md:text-right mt-4 md:flex md:justify-end">
  <div className="bg-charcoal-900 mx-2 p-2 h-full flex flex-row align-middle justify-between items-center rounded-lg font-light">
    <ul className="nav flex flex-row items-center text-xs">
      <button
        type="button"
        className={cn(
          "py-2 pl-1 pr-2 inline-block w-auto text-gray-500 rounded-lg font-semibold text-xs",
          {
            "animate-bounce": formValid
          }
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 p-1 mr-2 inline-flex bg-charcoal-300 text-charcoal-900 rounded-md"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        Click to Proceed{" "}
      </button>
    </ul>
    <ul className="nav flex flex-row text-xs space-x-3">
      {/* <button
        type="button"
        className="block w-full md:inline-block pr-3 md:w-auto bg-charcoal-400 text-gray-500 hover:bg-green-300 hover:text-charcoal-900 rounded-md font-semibold text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 p-2 mr-2 inline-flex bg-green-300 text-charcoal-900 rounded-md"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Add Stock{" "}
      </button> */}
      <button
        type="button"
        className="py-2 pl-1 pr-2 inline-block w-auto bg-charcoal-400 text-gray-500 hover:bg-green-300 hover:text-charcoal-900 rounded-lg font-semibold text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 p-1 mr-1 inline-flex bg-green-300 text-charcoal-900 rounded-md"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Add Stock{" "}
      </button>
      <button
        type="button"
        className="py-2 pl-1 pr-2 inline-block w-auto bg-charcoal-400 text-gray-500 hover:bg-red-300 hover:text-charcoal-900 rounded-lg font-semibold"
        onClick={cancel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 p-1 mr-1 inline-flex bg-red-300 text-charcoal-900 rounded-md"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>{" "}
        Cancel
      </button>
    </ul>
  </div>
);

const AddStockModal: FC<AddStockModalProps> = ({ isShowing, cancel }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [stockQuantity, setStockQuantity] = useState("");
  const [stockShares, setStockShares] = useState("");
  const [ticker, setTicker] = useState("");

  const [stock, setStock] = useState(null);
  const { stockSuggestions, _isLoading, _isError } = useStockSearch(ticker || null);

  const [searchState, setSearchState] = useState(SearchState.STABLE);
  const [isStockQuantityValid, setStockQuantityValidity] = useState(false);
  const [isStockSharesValid, setStockSharesValidity] = useState(false);

  const [formState, setFormState] = useState(0);
  const [formValid, setFormValid] = useState(false);

  const isFormValid = () => {
    const isformValid =
      searchState === SearchState.SUCCESS && isStockQuantityValid && isStockSharesValid;
    setFormValid(!!isformValid);
    console.log(searchState, isStockQuantityValid, isStockSharesValid,isformValid, formValid);
  };

  const fetchStock = stockTicker => {
    setSearchState(SearchState.PENDING);
    getStockInformation(stockTicker)
      .then(({ status, data: stockData }) => {
        if (status === 200) {
          setSearchState(SearchState.SUCCESS);
          isFormValid();
          setStock(stockData);
        }
      })
      .catch(e => {
        console.error(e);
        setSearchState(SearchState.FAILURE);
      })
      .finally(() => {
        console.log("request completed");
      });
  };

  const onStockQuantityChange = e => {
    setStockQuantity(e.target.value);
    setStockQuantityValidity(e.target.checkValidity());
    isFormValid();
  };

  const onStockSharesChange = e => {
    setStockShares(e.target.value);
    setStockSharesValidity(e.target.checkValidity());
    isFormValid();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("Setting Ticker");
      // setSearchState(SearchState.STABLE);
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
      <div className="bg-white rounded-lg md:max-w-lg md:w-full md:mx-auto p-2 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
        <div className="px-2 py-5 sm:px-4 flex flex-col">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Stock Information</h3>
        </div>
        <div className="border-t border-gray-200 py-2">
          <dl>
            <div className="bg-gray-50 p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
              <dt className="text-sm py-2 px-4 font-semibold bg-charcoal-400 text-gray-400 rounded-md">
                Ticker
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 rounded-md flex flex-row relative">
                <StockSearchCombobox
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  stockSuggestions={stockSuggestions}
                  fetchStock={fetchStock}
                  searchState={searchState}
                />
              </dd>
            </div>
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 text-gray-600">
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
                  onChange={onStockQuantityChange}
                />
              </dd>
            </div>
            <div className="bg-white p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 text-gray-600">
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
                  onChange={onStockSharesChange}
                />
              </dd>
            </div>
            {/* {stock ? <StockInformationTable stock={stock} /> : null} */}
          </dl>
        </div>

        <ButtonPanel cancel={cancel} formState={formState} formValid={formValid} />
        <UtilityFooter />
      </div>
    </div>
  );
};

export default AddStockModal;

// reference
/* https://tailwindcomponents.com/component/modal
   https://codepen.io/iamsahilvhora/pen/LYYxQJw */
