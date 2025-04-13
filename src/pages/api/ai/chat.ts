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
const geminiApiKey = process.env.GEMINI_API_KEY!;
const geminiBaseUrl = "https://generativelanguage.googleapis.com/v1beta/models";

// Handler for Gemini API
async function handleGeminiRequest(modelId: string, options: any): Promise<Response> {
  const url = `${geminiBaseUrl}/${modelId}:streamGenerateContent?key=${geminiApiKey}`;
  const headers = {
    "Content-Type": "application/json"
  };
  const body = JSON.stringify({
    contents: options.messages.map((message: any) => ({
      role: message.role === "system" ? "model" : message.role,
      parts: [{ text: message.content }]
    })),
    generationConfig: {
      responseMimeType: "text/plain"
    }
  });

  console.log(url, { method: "POST", headers, body });

  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) {
    console.error("Gemini API error:", response);
    throw new Error(`Gemini API error! Status: ${response.status}`);
  }

  return response.json();
}

// Handler for Mistral API
async function handleMistralRequest(modelId: string, options: any): Promise<Response> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${modelId}`;
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(options);

  console.log(url, { method: "POST", headers, body });

  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) {
    throw new Error(`Mistral API error! Status: ${response.status}`);
  }

  return response.json();
}

// Main handler
const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { modelId, options } = req.body;
    console.log(modelId);
    try {
      let result;
      if (modelId.startsWith("gemini")) {
        result = await handleGeminiRequest(modelId, options);
      } else {
        result = await handleMistralRequest(modelId, options);
      }

      res.status(200).json(result);
    } catch (error: any) {
      console.error("Error handling request:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
};

export default async function yahooFinanceQueryController(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
