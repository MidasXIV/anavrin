import axios, { AxiosResponse } from "axios";

let cancelToken;
const fetchUserPortfolio = async (): Promise<AxiosResponse> => {
  // Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  // Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  return axios.get(`/api/portfolio/`, {
    cancelToken: cancelToken.token
  });
};

export default fetchUserPortfolio;
