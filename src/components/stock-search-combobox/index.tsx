import { FC, useState } from "react";
import useStockSearch from "../../hooks/useStockSearch";
import Autocomplete, { AutocompleteItem } from "../ui/autocomplete";

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

interface StockSearchComboboxProps {
  searchTerm: string;
  setSearchTerm: (ticker: string) => void;
  state: SearchStateType;
}

const StockSearchCombobox: FC<StockSearchComboboxProps> = ({
  searchTerm,
  setSearchTerm,
  state
}) => {
  const [stockTicker, setStockTicker] = useState<string>("");
  const { stockSuggestions, isLoading, isError } = useStockSearch(stockTicker || null);

  const items: AutocompleteItem[] =
    stockSuggestions
      ?.filter(stock => stock.isYahooFinance)
      .map(stock => ({
        id: stock.symbol,
        symbol: stock.symbol,
        name: stock.longname || stock.shortname || stock.name,
        exchange: stock.exchange ? `${stock.exchange} (${stock.exchDisp})` : undefined,
        matchScore: stock.score,
        ...stock // Include all other stock properties
      })) || [];

  const handleSelect = (item: AutocompleteItem) => {
    setSearchTerm(item.id);
    setStockTicker(item.id);
  };

  return (
    <Autocomplete
      value={stockTicker}
      onChange={setStockTicker}
      onSelect={handleSelect}
      items={items}
      placeholder="Search stocks..."
      isLoading={isLoading}
      isError={isError}
      isSuccess={state === SearchState.SUCCESS}
      renderItem={suggestion => (
        <>
          <span className="font-semibold">{suggestion.symbol}</span>
          <p className="">{suggestion.name}</p>
          <span className="hidden flex-row items-center text-xs text-gray-500 group-hover:flex">
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
        </>
      )}
    />
  );
};

export default StockSearchCombobox;
