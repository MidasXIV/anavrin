type UserNotLoggedIn = {
  type: "UserNotLoggedIn";
};

type MaxPortfoliosReached = {
  type: "MaxPortfoliosReached";
};

type FailedToUpdatePortfolio = {
  type: "FailedToUpdatePortfolio";
};

type InternalServerError = {
  type: "InternalServerError";
};

interface SaveUserPortfolioDTO {
  ok: boolean;
  value: Portfolio;
}

type SaveUserPortfolioResponse = Either<
  UserNotLoggedIn | MaxPortfoliosReached | FailedToUpdatePortfolio | InternalServerErrors,
  SaveUserPortfolioDTO
>;

interface ISaveUserPortfolio {
  execute(portfolio: Portfolio): Promise<SaveUserPortfolioResponse>;
}
