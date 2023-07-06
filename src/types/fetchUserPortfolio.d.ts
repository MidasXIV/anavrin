interface FetchUserPortfolioDTO {
  portfolios: Array<Portfolio>;
}

type FetchUserPortfolioResponse = Either<
  UserNotLoggedIn | InternalServerError,
  FetchUserPortfolioDTO
>;

interface IFetchUserPortfolio {
  execute(): Promise<FetchUserPortfolioResponse>;
}

type PushSubscriptionDocument = PushSubscription & {
  _id: string;
};
