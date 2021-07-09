import useSWR from "swr";
import axios from "axios";

const fetcher = url => axios(url).then(res => res.data);

const useStockInformation = (ticker: string): any => {
  const { data, error } = useSWR(ticker ? `/api/dividend/?ticker=${ticker}` : null, fetcher);
  return {
    stock: data,
    isLoading: !error && !data,
    isError: error
  };
};

export default useStockInformation;
