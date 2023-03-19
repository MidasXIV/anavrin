import axios from "axios";

let cancelToken;
const deleteUserPortfolio = async (portfolio: Portfolio): Promise<any> => {
  // Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }

  // Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();

  return axios.delete(`/api/portfolio/`, {
    data: { portfolio },
    cancelToken: cancelToken.token
  });
};

export default deleteUserPortfolio;
