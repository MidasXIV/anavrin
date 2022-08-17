import { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/client";
import createHandlers from "../../../lib/rest-utils";

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const [session, loading] = useSession();
    const isSignedIn = loading ? "" : Boolean(session?.user) ?? false;
    res.send(isSignedIn);
  }
};

export default async function SaveSubscription(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
