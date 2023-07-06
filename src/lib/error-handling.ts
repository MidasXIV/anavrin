export const ErrorType = {
  ServerTimeOut: "ServerTimeOut",
  InvalidRequest: "InvalidRequest",
  // Common Controller Errors
  InternalServerError: "InternalServerError",
  // SubscribeUserErrors
  UserAlreadySubscribed: "UserAlreadySubscribed",
  InvalidEmail: "InvalidEmail",
  FailedToSubscribeUser: "FailedToSubscribeUser"
} as const;

export const errorHandler = error => {
  const { request, response } = error;
  if (response) {
    const { data, status } = response;
    return {
      data,
      status
    };
  }
  if (request) {
    // request sent but no response received
    return {
      data: { type: ErrorType.ServerTimeOut },
      status: 503
    };
  }
  // Something happened in setting up the request that triggered an Error
  return { data: { type: ErrorType.InvalidRequest } };
};
