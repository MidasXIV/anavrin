import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

class CreateDeletePushSubscriptionController {
  private useCase: IDeletePushSubscription;

  constructor(useCase: IDeletePushSubscription) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const { subscriptionId } = request.body;
    try {
      const result = await this.useCase.execute(subscriptionId);
      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
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

export default CreateDeletePushSubscriptionController;
