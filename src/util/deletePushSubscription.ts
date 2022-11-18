import axios from "axios";

let cancelToken;
const postDeleteSubscription = async (subscriptionId: string): Promise<any> => {
  // Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  // Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  return axios.post(
    `/api/web-push/delete-subscription/`,
    { subscriptionId },
    {
      cancelToken: cancelToken.token
    }
  );
};

export default postDeleteSubscription;
