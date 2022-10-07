/**
 * Controllers are responsible for
 * * Parsing request and validating the params; Passing to the useCase;
 * * Hanlding error codes from the useCase;
 * * Mapping the data to DTO or persistence.
 */
import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

export default class CreateSaveSubscriptionController {
  useCase: ISaveSubscription;

  constructor(useCase: ISaveSubscription) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const { subscription } = request.body;

    // find validation helpers.

    // Validate if pushSubscription is passed
    // Make sure user is authenticated.
    if (!subscription) {
      return response.status(400).json({
        message: `Subscription not present`
      });
    }

    try {
      const result = await this.useCase.execute(subscription);

      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
          case "UserNotLoggedIn":
            response.status(401).json(result);
            break;
          case "MaxSubscriptionsReached":
            response.status(403).json(result);
            break;
          case "FailedToUpdateSubscription":
            response.status(500).json(result);
            break;
          default:
            response.status(500).json(result);
            break;
        }
      }

      const resultSuccess = Result.getValue(result);
      response.status(201).json(resultSuccess);
    } catch (err) {
      // Report the error to metrics + logging app
      response.status(500);
    }
  }
}
