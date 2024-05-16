import { NextApiRequest, NextApiResponse } from "next";
import Result from "../../lib/result";

class CreateBacktestAnalyzeController {
  private useCase: IBacktestAnalyze;

  constructor(useCase: IBacktestAnalyze) {
    this.useCase = useCase;
  }

  public async execute(request: NextApiRequest, response: NextApiResponse): Promise<void> {
    const requestBody = request.body;
    try {
      const result = await this.useCase.execute(requestBody);
      if (Result.isFail(result)) {
        const resultError = Result.getError(result);
        switch (resultError.type) {
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

export default CreateBacktestAnalyzeController;
