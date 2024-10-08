type postSubscribeUserRequest = {
  email: string;
};

type postDeleteSubscriptionRequest = {
  subscriptionId: string;
};

type postSaveSubscriptionRequest = {
  subscription: PushSubscription;
};

type saveUserPortfolioRequest = {
  portfolio: Portfolio;
};

type deleteUserPortfolioRequest = {
  portfolio: Portfolio;
};

type triggerPushSubscriptionRequest = {
  title: string;
  message: string;
  subscription: PushSubscriptionDocument;
};

export interface ApiRequests {
  postSubscribeUserRequest: postSubscribeUserRequest;
  postDeleteSubscriptionRequest: postDeleteSubscriptionRequest;
  postSaveSubscriptionRequest: postSaveSubscriptionRequest;
  saveUserPortfolioRequest: saveUserPortfolioRequest;
  deleteUserPortfolioRequest: deleteUserPortfolioRequest;
  triggerPushSubscriptionRequest: triggerPushSubscriptionRequest;
}

// type postSubscribeUserRequest2 = Pick< ApiRequests, "postSubscribeUserRequest" >["postSubscribeUserRequest"];

export const apiMapper = {
  getStockInformation: {
    url: "/api/dividend",
    method: "get"
  },
  // web-push-api
  postDeleteSubscription: {
    url: "/api/web-push/delete-subscription",
    method: "post",
    requestType: "postDeleteSubscriptionRequest"
  },
  postSaveSubscription: {
    url: "/api/web-push/save-subscription/",
    method: "post",
    requestType: "postSaveSubscriptionRequest"
  },
  fetchPushSubscription: {
    url: "/api/web-push/fetch-subscription/",
    method: "get"
  },
  triggerPushSubscription: {
    url: `${process.env.NEXTAUTH_URL}/api/web-push/trigger-web-push`,
    method: "post",
    requestType: "triggerPushSubscriptionRequest",
    doNotLimit: true
  },
  postSubscribeUser: {
    url: "/api/subscribe",
    method: "post",
    requestType: "postSubscribeUserRequest"
  },
  // economic-events-api
  fetchEconomicEvents: {
    url: "/api/services/economic-events/",
    method: "get"
  },
  // world-stock-indicies-api
  fetchWorldStockIndiciesData: {
    url: "/api/services/world-stock-indicies/",
    method: "get"
  },
  // user-portfolio-apis
  deleteUserPortfolio: {
    url: "/api/portfolio",
    method: "delete",
    requestType: "deleteUserPortfolioRequest"
  },
  saveUserPortfolio: {
    url: "/api/portfolio",
    method: "post",
    requestType: "saveUserPortfolioRequest"
  },
  fetchUserPortfolio: {
    url: "/api/portfolio/",
    method: "get"
  }
} as const;

export type ApiEndpoints = keyof typeof apiMapper;
