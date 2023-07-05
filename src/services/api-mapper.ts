type postSubscribeUserRequest = {
  email: string;
};

type postDeleteSubscriptionRequest = {
  subscriptionId: string;
};

type postSaveSubscriptionRequest = {
  subscription: PushSubscription;
};

export interface ApiRequests {
  postSubscribeUserRequest: postSubscribeUserRequest;
  postDeleteSubscriptionRequest: postDeleteSubscriptionRequest;
  postSaveSubscriptionRequest: postSaveSubscriptionRequest;
}

// type postSubscribeUserRequest2 = Pick< ApiRequests, "postSubscribeUserRequest" >["postSubscribeUserRequest"];

export const apiMapper = {
  getStockInformation: {
    url: "/api/dividend",
    method: "get"
  },
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
  fetchEconomicEvents: {
    url: "/api/services/economic-events/",
    method: "get"
  }
} as const;

export type ApiEndpoints = keyof typeof apiMapper;
