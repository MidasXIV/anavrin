import axios from "axios";

const makeRequest = async (url: string): Promise<any> => {
  /** function to make request to appropriate Yahoo Finance page */

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36"
      }
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    }
    console.log("unexpected error: ", error);
    return "An unexpected error occurred";
  }
};

export default makeRequest;
