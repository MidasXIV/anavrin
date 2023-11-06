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

type createCheckoutSessionRequest = {
  price: number;
  quantity?: number;
  metadata?: Record<string, any>;
};

export interface ApiRequests {
  postSubscribeUserRequest: postSubscribeUserRequest;
  postDeleteSubscriptionRequest: postDeleteSubscriptionRequest;
  postSaveSubscriptionRequest: postSaveSubscriptionRequest;
  saveUserPortfolioRequest: saveUserPortfolioRequest;
  deleteUserPortfolioRequest: deleteUserPortfolioRequest;
  createCheckoutSessionRequest: createCheckoutSessionRequest;
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
  // subscription-pricing-api
  getActiveProductsWithPrices: {
    url: "/api/services/subscription-pricing/",
    method: "get"
  },
  // user-portfolio-apis
  deleteUserPortfolio: {
    url: "/api/portfolio/",
    method: "delete",
    requestType: "deleteUserPortfolioRequest"
  },
  saveUserPortfolio: {
    url: "/api/portfolio/",
    method: "post",
    requestType: "saveUserPortfolioRequest"
  },
  fetchUserPortfolio: {
    url: "/api/portfolio/",
    method: "get"
  },
  // stripe
  createCheckoutSession: {
    url: "api/stripe/create-checkout-session",
    method: "post",
    requestType: "createCheckoutSessionRequest"
  },
  createPortalLink: {
    url: "api/stripe/create-portal-link",
    method: "post"
  },

  // user/subscription
  getSubscription: {
    url: "/api/user/subscription/",
    method: "get"
  }
} as const;

export type ApiEndpoints = keyof typeof apiMapper;
