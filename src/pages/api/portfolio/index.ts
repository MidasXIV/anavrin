import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  CreateDeleteUserPortfolioController,
  DeleteUserPortfolio
} from "../../../controllers/deleteUserPortfolio";
import {
  CreateFetchUserPortfolioController,
  FetchUserPortfolio
} from "../../../controllers/fetchUserPortfolio";
import {
  SaveUserPortfolio,
  CreateSaveUserPortfolioController
} from "../../../controllers/saveUserPortfolio";
import connectToDatabase from "../../../lib/mongodb";
import createHandlers from "../../../lib/rest-utils";
import UserPortfolioModel from "../../../repositories/UserPortfolioModel/userPortfolioModel";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const db = await connectToDatabase();

    const userPortfolioModel = new UserPortfolioModel(db);
    const saveUserPortfolio = new SaveUserPortfolio(userPortfolioModel, session);
    const saveUserPortfolioController = new CreateSaveUserPortfolioController(saveUserPortfolio);

    await saveUserPortfolioController.execute(req, res);
  },
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const db = await connectToDatabase();

    const userPortfolioModel = new UserPortfolioModel(db);
    const fetchUserPortfolio = new FetchUserPortfolio(userPortfolioModel, session);
    const fetchUserPortfolioController = new CreateFetchUserPortfolioController(fetchUserPortfolio);

    await fetchUserPortfolioController.execute(req, res);
  },
  DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const db = await connectToDatabase();

    const userPortfolioModel = new UserPortfolioModel(db);
    const deleteUserPortfolio = new DeleteUserPortfolio(userPortfolioModel, session);
    const deleteUserPortfolioController = new CreateDeleteUserPortfolioController(
      deleteUserPortfolio
    );

    await deleteUserPortfolioController.execute(req, res);
  }
};

export default async function userPortfolioController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
