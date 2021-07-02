import useSWR from "swr";
import axios from "axios";

const fetcher = url => axios(url).then(res => res.data);

const useStockSearch = (ticker: string): any => {
  const API_KEY = process.env.ALPHAVANTAGE_API_KEY;
  const { data, error } = useSWR(
    ticker
      ? `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${API_KEY}`
      : null,
    fetcher
  );
  return {
    stockSuggestions: data,
    stockSuggestionsLoading: !error && !data,
    stockSuggestionsError: error
  };
};

export default useStockSearch;
