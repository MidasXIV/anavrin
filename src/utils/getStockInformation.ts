import axios, { CancelTokenSource } from "axios";

const cancelTokenDict: Record<string, CancelTokenSource> = {};
let cancelToken;

const getStockInformation = async (ticker: string, limit = true): Promise<any> => {
  const url = `/api/dividend/?ticker=${ticker}`;

  // Check if there is a cancel token associated with the URL endpoint
  if (cancelTokenDict[url]) {
    cancelTokenDict[url].cancel("Operation canceled due to new request.");
  }

  // Create a new cancel token for the current request
  cancelToken = axios.CancelToken.source();
  cancelTokenDict[url] = cancelToken;

  return axios(url, {
    cancelToken: cancelToken.token
  });
};

export default getStockInformation;
