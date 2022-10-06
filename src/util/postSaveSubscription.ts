import axios from "axios";

let cancelToken;
const postSaveSubscription = async (subscription: PushSubscription): Promise<any> => {
  // Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  // Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  return axios.post(
    `/api/web-push/save-subscription/`,
    { subscription },
    {
      cancelToken: cancelToken.token
    }
  );
};

export default postSaveSubscription;
