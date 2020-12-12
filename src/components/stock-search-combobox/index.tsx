import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import useModal from "../../hooks/useModal";

type StockSearchComboboxProps = {
  searchTerm: string;
  setSearchTerm: (ticker: string) => void;
};

const tempStockSearchData = {
  bestMatches: [
    {
      "1. symbol": "TSCDY",
      "2. name": "Tesco PLC",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-05",
      "8. currency": "USD",
      "9. matchScore": "0.7273"
    },
    {
      "1. symbol": "TSCDF",
      "2. name": "Tesco PLC",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-05",
      "8. currency": "USD",
      "9. matchScore": "0.7143"
    },
    {
      "1. symbol": "TSCO.LON",
      "2. name": "Tesco PLC",
      "3. type": "Equity",
      "4. region": "United Kingdom",
      "5. marketOpen": "08:00",
      "6. marketClose": "16:30",
      "7. timezone": "UTC+00",
      "8. currency": "GBP",
      "9. matchScore": "0.7143"
    },
    {
      "1. symbol": "TCO.DEX",
      "2. name": "Tesco PLC",
      "3. type": "Equity",
      "4. region": "XETRA",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+01",
      "8. currency": "EUR",
      "9. matchScore": "0.7143"
    },
    {
      "1. symbol": "TCO1.FRK",
      "2. name": "Tesco PLC",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+01",
      "8. currency": "EUR",
      "9. matchScore": "0.7143"
    }
  ]
};

const SPACEBAR_KEY_CODE = [0, 32];
const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;

const ModalStockSearchInputID = "modal_input_stock";

const StockSearchCombobox: FC<StockSearchComboboxProps> = ({ searchTerm, setSearchTerm }) => {
  const { isShowing, open, close, toggle } = useModal(false);
  const [stockOption, setStockOption] = useState("");
  const stockSearchOptions = useRef();

  const handleKeyDown = e => {
    // blocks from making an input
    // if (document.activeElement.id === ModalStockSearchInputID) {
    //   stockSearchOptions.current.firstChild.focus();
    //   console.log(document.activeElement.id);
    // }
    switch (e.keyCode) {
      case ENTER_KEY_CODE:
        // setSelectedListItem(e);
        // closeList();
        console.log("Calling API");
        console.log("Enter");
        break;

      case DOWN_ARROW_KEY_CODE:
        // focusNextListItem(DOWN_ARROW_KEY_CODE);
        console.log("Down");
        if (document.activeElement.id === ModalStockSearchInputID) {
          stockSearchOptions.current.firstChild.focus();
          console.log(document.activeElement.id);
        }
        break;

      case UP_ARROW_KEY_CODE:
        // focusNextListItem(UP_ARROW_KEY_CODE);
        console.log("Up");
        break;

      case ESCAPE_KEY_CODE:
        // closeList();
        close();
        console.log("Escape");
        break;

      default:
        break;
    }
  };

  const handleBlur = ev => {
    // Use timeout to delay examination of activeElement until after blur/focus
    // events have been processed.
    setTimeout(function () {
      const target = ev.explicitOriginalTarget || document.activeElement;
      const targetTag = target.tagName;
      if (targetTag !== "LI") {
        close();
      }
    }, 1);
  };

  const stockSearchSuggestionsData = tempStockSearchData.bestMatches.map(stock => {
    return {
      symbol: stock["1. symbol"],
      name: stock["2. name"],
      type: stock["3. type"],
      region: stock["4. region"],
      currency: stock["8. currency"],
      matchScore: stock["9. matchScore"]
    };
  });

  const stockSearchSuggestions = stockSearchSuggestionsData.map(suggestion => {
    return (
      <li
        className="focus:outline-none focus:flex-col px-4 py-2 text-gray-800 rounded-lg text-xs focus:bg-gray-300 hover:bg-gray-300 cursor-pointer flex flex-row justify-between text"
        aria-labelledby="dropdown-label"
        aria-selected="false"
        key={suggestion.symbol}
        role="option"
        tabIndex={0}
        data-ticker={suggestion.symbol}
        onClick={e => {
          let target = e.target as HTMLLIElement;
          if (target.tagName !== "LI") {
            target = (e.target as HTMLLIElement).parentElement;
          }
          const { ticker } = target.dataset;
          if (ticker) {
            setSearchTerm(ticker);
            close();
          }
        }}
        onKeyDown={e => {
          console.log((e.target as HTMLLIElement).dataset.ticker);
          switch (e.keyCode) {
            case ENTER_KEY_CODE:
              setSearchTerm((e.target as HTMLLIElement).dataset.ticker);
              console.log((e.target as HTMLLIElement).dataset.ticker);
              close();
              break;

            case DOWN_ARROW_KEY_CODE: {
              const { nextSibling } = document.activeElement;
              if (nextSibling) {
                (nextSibling as HTMLLIElement).focus();
              } else {
                stockSearchOptions.current.firstChild.focus();
              }
              break;
            }

            case UP_ARROW_KEY_CODE: {
              const { previousSibling } = document.activeElement;
              if (previousSibling) {
                (previousSibling as HTMLLIElement).focus();
              } else {
                stockSearchOptions.current.lastChild.focus();
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
        <span className="text-xs text-gray-500 flex flex-row items-center hidden">
          Select
          <svg
            id="Capa_1"
            enableBackground="new 0 0 374.706 374.706"
            height="512"
            viewBox="0 0 374.706 374.706"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-white stroke-current stroke-0 w-6 h-6 p-1 bg-gray-500 rounded-md ml-2"
          >
            <path d="m321.176 53.529h-107.058v53.529h107.059v80.294l-214.111-.007 40.141-40.141-40.147-40.147-107.06 107.061 107.059 107.059 40.147-40.147-40.153-40.153 214.124-.02c29.522 0 53.529-24.007 53.529-53.529v-80.268c0-29.523-24.007-53.53-53.53-53.531z" />
          </svg>
        </span>
      </li>
    );
  });

  return (
    <div className="relative w-full z-50">
      <input
        type="text"
        name="stock"
        id={ModalStockSearchInputID}
        className="bg-gray-300 w-full text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onFocus={open}
        onBlur={handleBlur}
      />
      <span className="absolute inline-flex right-0 justify-end items-center text-gray-500 py-2 px-4">
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
      <ul
        ref={stockSearchOptions}
        className={cn("absolute w-full max-w-md -mt-1 p-2 bg-white rounded-lg shadow-lg", {
          hidden: !isShowing
        })}
      >
        {stockSearchSuggestions}
      </ul>
    </div>
  );
};

export default StockSearchCombobox;
