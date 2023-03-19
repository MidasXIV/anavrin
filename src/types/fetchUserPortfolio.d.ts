interface FetchUserPortfolioDTO {
  portfolios: Array<Portfolio>;
}

type FetchUserPortfolioResponse = Either<
  UserNotLoggedIn | InternalServerErrors,
  FetchUserPortfolioDTO
>;

interface IFetchUserPortfolio {
  execute(): Promise<FetchUserPortfolioResponse>;
}

type PushSubscriptionDocument = PushSubscription & {
  _id: string;
};
