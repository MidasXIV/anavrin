import { NextApiRequest, NextApiResponse } from "next";
import createHandlers from "../../../lib/rest-utils";

async function streamResponse(response: Response, writer: WritableStreamDefaultWriter) {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = ""; // Buffer to accumulate chunks

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // Handle any remaining data in the buffer at the end of the stream
      if (buffer.trim() !== "") {
        try {
          const parsedData = JSON.parse(buffer);
          console.log(parsedData.response);
          await writer.write(parsedData.response);
        } catch (error) {
          console.error("Final buffer parsing error:", error);
        }
      }
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    // Process complete lines from the buffer
    let newlineIndex;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      const line = buffer.substring(0, newlineIndex).trim();
      buffer = buffer.substring(newlineIndex + 1);

      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();

        if (data === "[DONE]") {
          // End of stream
          break;
        } else {
          try {
            const parsedData = JSON.parse(data);
            await writer.write(parsedData.response);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            // Keep incomplete JSON in the buffer to try again after more data is received
            buffer = `${line}\n${buffer}`;
            break;
          }
        }
      }
    }
  }

  await writer.close();
}

interface RequestBody {
  modelId: string;
  options: {
    stream: boolean;
    messages: Array<any>;
  };
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
const apiToken = process.env.CLOUDFLARE_API_TOKEN!;

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse): Promise<Response> => {
    const { modelId, options } = req.body;
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${modelId}`;
    const headers = {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(options);

    console.log(url, {
      method: "POST",
      headers,
      body
    });
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });

    if (!response.ok) {
      return new Response(`HTTP error! status: ${response.status}`, {
        status: response.status
      });
    }

    console.log(JSON.stringify(response));

    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
    return result;

    // Create a TransformStream to process the response
    // const { readable, writable } = new TransformStream();
    // const writer = writable.getWriter();

    // // Start streaming the response
    // streamResponse(response, writer);

    // return new Response(readable, {
    //   headers: {
    //     "content-type": "text/plain",
    //   },
    // });
  }
};

export default async function yahooFinanceQueryController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
