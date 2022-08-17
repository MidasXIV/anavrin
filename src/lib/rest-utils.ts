/**
 * Handles REST HTTP methods defined in `handlers`
 * as a dictionary of methods-to-functions.
 *
 * Errors are caught and returned.
 */

import { NextApiRequest, NextApiResponse } from "next";

enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  GET = "GET",
  DELETE = "DELETE"
}

type Handlers = {
  [httpMethod in HttpMethod]?: (req: NextApiRequest, res: NextApiResponse) => void;
};

export default function createHandlers(handlers: Handlers) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const handler = handlers[req.method];
    if (handler) {
      try {
        await handler(req, res);
      } catch (err) {
        res.status(err.status || 500).end(err.message);
      }
    } else {
      res.setHeader("Allow", Object.keys(handlers));
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
}
