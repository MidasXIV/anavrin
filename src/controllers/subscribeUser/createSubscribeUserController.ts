import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateSubscribeUserController {
  private useCase: ISubscribeUser;

  constructor(useCase: ISubscribeUser) {
    this.useCase = useCase;
  }

  public async execute(
    request: NextApiRequest,
    response: NextApiResponse<SubscribeUserControllerResponse>
  ): Promise<void> {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        type: "InvalidEmail"
      });
    }

    try {
      const result = await this.useCase.execute(email);

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UserAlreadySubscribed":
            response.status(409);
            break;
          case "FailedToSubscribeUser":
            response.status(500);
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
    } catch (error) {
      response.status(500).json({ type: "InternalServerError" });
    }
    return null;
  }
}
