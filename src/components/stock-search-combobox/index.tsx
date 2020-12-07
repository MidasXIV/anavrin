import { FC, useEffect, useState } from "react";
import cn from "classnames";
import useModal from "../../hooks/useModal";

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

const StockSearchCombobox: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isShowing, toggle } = useModal(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      // Send Axios request here
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      console.log("call API");
    }
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
        className="block px-4 py-2 text-gray-800 hover:bg-gray-300 rounded-lg text-xs"
        key={suggestion.symbol}
      >
        {suggestion.symbol} - {suggestion.name}
      </li>
    );
  });

  return (
    <div className="relative w-full">
      <input
        type="text"
        name="stock"
        id="modal_input_stock"
        className="bg-gray-300 w-full text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={toggle}
        onBlur={toggle}
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
