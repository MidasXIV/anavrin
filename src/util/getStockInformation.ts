import axios from "axios";

let cancelToken;
const getStockInformation = async (ticker: string, limit = true): Promise<any> => {
  // Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  // Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  return axios(`/api/dividend/?ticker=${ticker}`, {
    cancelToken: limit ? cancelToken.token : undefined
  });
};

export default getStockInformation;
