type UserNotLoggedIn = {
  type: "UserNotLoggedIn";
};

type NoMatchingPortfolio = {
  type: "NoMatchingPortfolio";
};

type FailedToDeletePortfolio = {
  type: "FailedToDeletePortfolio";
};

type InternalServerError = {
  type: "InternalServerError";
};

interface DeleteUserPortfolioDTO {
  ok: boolean;
  value: Portfolio;
}

type DeleteUserPortfolioResponse = Either<
  UserNotLoggedIn | NoMatchingPortfolio | FailedToDeletePortfolio | InternalServerErrors,
  DeleteUserPortfolioDTO
>;

interface IDeleteUserPortfolio {
  execute(portfolio: Portfolio): Promise<DeleteUserPortfolioResponse>;
}
