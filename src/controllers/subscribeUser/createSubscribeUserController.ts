import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateSubscribeUserController {
  private useCase: ISubscribeUser;

  constructor(useCase: ISubscribeUser) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        message: `Email not present`
      });
    }

    try {
      const result = await this.useCase.execute(email);

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UserAlreadySubscribed":
            response.status(401).json(result);
            break;
          case "FailedToSubscribeUser":
            response.status(500).json(result);
            break;
          default:
            response.status(500).json(result);
            break;
        }
      }

      const resultSuccess = Result.getValue(result);
      response.status(200).json(resultSuccess);
    } catch (error) {
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
