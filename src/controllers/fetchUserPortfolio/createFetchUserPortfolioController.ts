import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateFetchPushSubscriptionController {
  useCase: IFetchUserPortfolio;

  constructor(useCase: IFetchUserPortfolio) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    try {
      const result = await this.useCase.execute();

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UserNotLoggedIn":
            response.status(401).json(result);
            break;
          default:
            response.status(500).json(result);
            break;
        }
      }

      const resultSuccess = Result.getValue(result);
      response.status(200).json(resultSuccess);
    } catch (e) {
      console.error(e);
      response.status(500);
    }
  }
}
