import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateFetchPushSubscriptionController {
  useCase: IFetchPushSubscription;

  constructor(useCase: IFetchPushSubscription) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse) {
    try {
      const result = await this.useCase.execute();

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UserNotLoggedIn":
            response.status(401);
            break;
          default:
            response.status(500);
            break;
        }
        response.json(resultError);
        return null;
      }

      const resultSuccess = Result.getValue(result);
      response.status(200).json(resultSuccess);
    } catch (e) {
      console.error(e);
      response.status(500);
    }
    return null;
  }
}
