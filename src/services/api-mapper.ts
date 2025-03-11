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

type yahooFinanceQueryRequest = {
  ticker: string;
  queryOptions?: {
    period1: string;
    period2?: string;
    interval:
      | "1mo"
      | "1m"
      | "2m"
      | "5m"
      | "15m"
      | "30m"
      | "60m"
      | "90m"
      | "1h"
      | "1d"
      | "5d"
      | "1wk"
      | "3mo";
    return: "object";
  };
};

type aiChatRequest = {
  modelId: string;
  options: {
    stream?: boolean;
    messages: Array<any>;
  };
};

type postBacktestAnalyzeRequest = {
  benchmark: string;
  initialInvestment: number;
  startYear: string;
  endYear: string;
  portfolioConfig: Array<{
    ticker: string;
    portfolioDistribution: Array<{ distribution: number }>;
  }>;
};

export interface ApiRequests {
  postSubscribeUserRequest: postSubscribeUserRequest;
  postDeleteSubscriptionRequest: postDeleteSubscriptionRequest;
  postSaveSubscriptionRequest: postSaveSubscriptionRequest;
  saveUserPortfolioRequest: saveUserPortfolioRequest;
  deleteUserPortfolioRequest: deleteUserPortfolioRequest;
  triggerPushSubscriptionRequest: triggerPushSubscriptionRequest;
  postBacktestAnalyzeRequest: postBacktestAnalyzeRequest;
  yahooFinanceQueryRequest: yahooFinanceQueryRequest;
  aiChatRequest: aiChatRequest;
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
  },
  postBacktestAnalyze: {
    url: "/api/backtest/analyze",
    method: "post",
    requestType: "postBacktestAnalyzeRequest"
  },
  // yahoo-finance-query
  yahooFinanceQuery: {
    url: "/api/services/yahoo-finance-query",
    method: "post",
    requestType: "yahooFinanceQueryRequest",
    doNotLimit: true
  },
  // ai/chat.ts
  aiChat: {
    url: "/api/ai/chat",
    method: "post",
    requestType: "aiChatRequest",
    doNotLimit: true
  },
} as const;

export type ApiEndpoints = keyof typeof apiMapper;
