import axios from "axios";
import { errorHandler } from "../lib/error-handling";

let cancelToken;
const postSubscribeUser = async (email: string): Promise<any> => {
  // Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  // Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  return axios
    .post(
      `/api/subscribe`,
      { email },
      {
        cancelToken: cancelToken.token
      }
    )
    .catch(errorHandler);
};

export default postSubscribeUser;
