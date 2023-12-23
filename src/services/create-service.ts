/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { errorHandler } from "../lib/error-handling";
import { ApiEndpoints, ApiRequests, apiMapper } from "./api-mapper";

const cancelTokenDict: Record<string, CancelTokenSource> = {};
let cancelToken;

const makeRequestWithCancelToken = async <T>(
  requestConfig: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const { url } = requestConfig;

  // Check if there is a cancel token associated with the URL endpoint
  if (cancelTokenDict[url]) {
    cancelTokenDict[url].cancel("Operation canceled due to new request.");
  }

  // Create a new cancel token for the current request
  cancelToken = axios.CancelToken.source();
  cancelTokenDict[url] = cancelToken;

  try {
    const response = await axios({
      ...requestConfig,
      cancelToken: cancelToken.token
    });

    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      // Request was canceled
      console.error("Request canceled");
    }

    return errorHandler(error) as AxiosResponse;
  } finally {
    // Clear the cancelToken once the request is complete
    cancelTokenDict[url].cancel();
    delete cancelTokenDict[url];
  }
};

type ApiMapper = {
  [key: string]: {
    url: string;
    method: "get" | "post" | "put" | "delete";
    requestType?: keyof ApiRequests; // Specify the request type for each endpoint
    responseType?: unknown; // Specify the response type for each endpoint
  };
};

// type ExtractRequestType<T> = T extends { requestType: infer R } ? R : never;
type ExtractRequestType<T> = T extends { requestType: infer R } ? R : never;
type ExtractResponseType<T> = T extends { responseType: infer R } ? R : never;

type ApiFunctions = {
  [K in ApiEndpoints]: (
    params?: Pick<ApiRequests, ExtractRequestType<(typeof apiMapper)[K]>>[ExtractRequestType<
      (typeof apiMapper)[K]
    >]
  ) => Promise<any>;
};

function createApiFunctions(_apiMapper: ApiMapper): ApiFunctions {
  const api: Partial<ApiFunctions> = {};

  for (const key in _apiMapper) {
    if (Object.prototype.hasOwnProperty.call(_apiMapper, key)) {
      const { url, method, requestType } = _apiMapper[key];
      api[key] = async (params?: Pick<ApiRequests, typeof requestType>[typeof requestType]) => {
        const requestConfig: AxiosRequestConfig = {
          url,
          method,
          data: params
        };
        console.log(requestConfig);
        return makeRequestWithCancelToken<ApiMapper[typeof key]["responseType"]>(requestConfig);
      };
    }
  }

  return api as ApiFunctions;
}

const api = createApiFunctions(apiMapper);

export default api;
