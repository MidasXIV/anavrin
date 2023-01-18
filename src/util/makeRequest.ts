import axios, { AxiosRequestConfig } from "axios";

/**
 * function to make request to appropriate endpoint
 *
 * @param {string} url - The URL to make the request to
 * @param {boolean} addCrawlingHeaders - A flag to determine whether to add crawling headers to the request or not (default: false)
 * @returns {Promise<any>} - A promise that resolves with the response or an error message
 */
const makeRequest = async (url: string, addCrawlingHeaders = false): Promise<any> => {
  // create an empty config object
  const config: AxiosRequestConfig = {};

  // if addCrawlingHeaders is true, add headers to config
  if (addCrawlingHeaders) {
    config.headers = {
      "Content-type": "application/json; charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true"
    };
  }

  try {
    // make GET request to the provided url using axios and the config
    const response = await axios.get(url, config);
    return response;
  } catch (error) {
    // if the error is an axios error, log the error message
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    }
    // if the error is an unexpected error, log it and return a message
    console.log("unexpected error: ", error);
    return "An unexpected error occurred";
  }
};

export default makeRequest;
