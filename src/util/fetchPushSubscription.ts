import axios, { AxiosResponse } from "axios";

let cancelToken;
const fetchPushSubscription = async (): Promise<AxiosResponse> => {
  // Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  // Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  return axios.get(`/api/web-push/fetch-subscription/`, {
    cancelToken: cancelToken.token
  });
};

export default fetchPushSubscription;
