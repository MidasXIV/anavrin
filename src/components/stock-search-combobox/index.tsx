import { FC, useRef, useState } from "react";
import { clsx } from "clsx";
import useModal from "../../hooks/useModal";
import useStockSearch from "../../hooks/useStockSearch";

type StockSuggestionItem = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
};

enum SearchState {
  STABLE = "STABLE",
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILURE = "FAILURE"
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'STABLE' | 'SUCCESS' | 'PENDING' | 'FAILURE';
 */
type SearchStateType = keyof typeof SearchState;

type StockSearchComboboxProps = {
  searchTerm: string;
  setSearchTerm: (ticker: string) => void;
  // stockSuggestions: { bestMatches: Array<StockSuggestionItem> };
  state: SearchStateType;
};

const tempStockSearchData = {
  bestMatches: []
};

const SPACEBAR_KEY_CODE = [0, 32];
const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;

const ModalStockSearchInputID = "modal_input_stock";

const SearchIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </span>
);

const SuccessIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </span>
);

const FailureIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </span>
);

const PendingIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      className="h-5 w-5 animate-spin text-gray-700"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />{" "}
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </span>
);

const StockSearchCombobox: FC<StockSearchComboboxProps> = ({
  searchTerm,
  setSearchTerm,
  state
}) => {
  const [stockTicker, setStockTicker] = useState(undefined);
  const { isShowing, open, close } = useModal(false);
  const stockSearchOptions = useRef<HTMLUListElement>();
  const stockSearchInput = useRef<HTMLInputElement>();
  const { stockSuggestions, _isLoading, _isError } = useStockSearch(stockTicker || null);

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case ENTER_KEY_CODE:
        setSearchTerm(searchTerm);
        break;

      case DOWN_ARROW_KEY_CODE:
        // focus Next List Item
        if (!isShowing) {
          // if modal not showing -> open modal
          open();
        }
        if (document.activeElement.id === ModalStockSearchInputID) {
          const SearchOptionList = stockSearchOptions.current;
          if (SearchOptionList && SearchOptionList.firstChild) {
            (SearchOptionList.firstChild as HTMLLIElement).focus();
          }
        }
        break;

      case ESCAPE_KEY_CODE:
        // close List
        close();
        break;

      default:
        break;
    }
  };

  const handleBlur = ev => {
    // Use timeout to delay examination of activeElement until after blur/focus
    // events have been processed.
    setTimeout(() => {
      const target = ev.explicitOriginalTarget || document.activeElement;
      const targetTag = target.tagName;
      if (targetTag !== "LI") {
        close();
      }
    }, 1);
  };

  // Current API limit is 5 API calls per minute
  const stockSuggestionsIsValid = !!stockSuggestions?.bestMatches;
  const paddedStockSuggestions = stockSuggestionsIsValid ? stockSuggestions : tempStockSearchData;

  const stockSearchSuggestionsData = paddedStockSuggestions.bestMatches.map(stock => ({
    symbol: stock["1. symbol"],
    name: stock["2. name"],
    type: stock["3. type"],
    region: stock["4. region"],
    currency: stock["8. currency"],
    matchScore: stock["9. matchScore"]
  }));

  const stockSearchSuggestions = stockSearchSuggestionsData.map(suggestion => (
    <li
      className="text flex cursor-pointer flex-row justify-between rounded-lg px-4 py-2 text-xs text-gray-800 hover:bg-gray-300 focus:flex-col focus:bg-gray-300 focus:outline-none"
      aria-labelledby="dropdown-label"
      aria-selected="false"
      key={suggestion.symbol}
      role="option"
      tabIndex={0}
      data-ticker={suggestion.symbol}
      onClick={e => {
        let target;
        target = e.target as HTMLLIElement;
        if (target.tagName !== "LI") {
          target = (e.target as HTMLLIElement).parentElement;
        }
        const { ticker } = target.dataset;
        if (ticker) {
          setSearchTerm(ticker);
          stockSearchInput.current.focus();
          close();
        }
      }}
      onKeyDown={e => {
        switch (e.keyCode) {
          case ENTER_KEY_CODE:
            setSearchTerm((e.target as HTMLLIElement).dataset.ticker);
            stockSearchInput.current.focus();
            close();
            break;

          case DOWN_ARROW_KEY_CODE: {
            const { nextSibling } = document.activeElement;
            if (nextSibling) {
              (nextSibling as HTMLLIElement).focus();
            } else {
              (stockSearchOptions.current.firstChild as HTMLLIElement).focus();
            }
            break;
          }

          case UP_ARROW_KEY_CODE: {
            const { previousSibling } = document.activeElement;
            if (previousSibling) {
              (previousSibling as HTMLLIElement).focus();
            } else {
              (stockSearchOptions.current.lastChild as HTMLLIElement).focus();
            }
            break;
          }

          case ESCAPE_KEY_CODE:
            // closeList();
            close();
            break;

          default:
            break;
        }
      }}
    >
      <span className="font-semibold">{suggestion.symbol}</span>
      <p className="">{suggestion.name}</p>
      <span className="flex hidden flex-row items-center text-xs text-gray-500">
        Select
        <svg
          id="Capa_1"
          enableBackground="new 0 0 374.706 374.706"
          height="512"
          viewBox="0 0 374.706 374.706"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-6 w-6 rounded-md bg-gray-500 fill-current stroke-current stroke-0 p-1 text-white"
        >
          <path d="m321.176 53.529h-107.058v53.529h107.059v80.294l-214.111-.007 40.141-40.141-40.147-40.147-107.06 107.061 107.059 107.059 40.147-40.147-40.153-40.153 214.124-.02c29.522 0 53.529-24.007 53.529-53.529v-80.268c0-29.523-24.007-53.53-53.53-53.531z" />
        </svg>
      </span>
    </li>
  ));

  return (
    <div className="relative z-50 w-full">
      <input
        type="text"
        name="stock"
        id={ModalStockSearchInputID}
        className="inline-flex h-9 w-full items-center rounded bg-gray-100 px-4 py-2 font-semibold text-gray-700"
        ref={stockSearchInput}
        onChange={e => setStockTicker(e.target.value)}
        value={stockTicker}
        onKeyDown={handleKeyDown}
        onFocus={open}
        onBlur={handleBlur}
      />
      {state === SearchState.STABLE ? <SearchIconComponent /> : null}
      {state === SearchState.PENDING ? <PendingIconComponent /> : null}
      {state === SearchState.SUCCESS ? <SuccessIconComponent /> : null}
      {state === SearchState.FAILURE ? <FailureIconComponent /> : null}
      <ul
        ref={stockSearchOptions}
        className={clsx("absolute -mt-1 w-full max-w-md rounded-lg bg-white p-2 shadow-lg", {
          hidden: !isShowing
        })}
      >
        {stockSearchSuggestions}
      </ul>
    </div>
  );
};

export default StockSearchCombobox;
