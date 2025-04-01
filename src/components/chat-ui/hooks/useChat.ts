import { useState, useRef, useEffect } from "react";
import api from "services/create-service";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

/**
 * Formats portfolio data into a human-readable string.
 * @param portfolio - Array of portfolio objects.
 * @returns A formatted string describing the portfolio.
 */
function formatPortfolioToHumanReadable(portfolio): string {
  if (!Array.isArray(portfolio) || portfolio.length === 0) {
    return "No portfolio data available.";
  }

  return portfolio
    .map(item => {
      const { title, fiat, holdings, marketPrice, marketValue, change, pnl } = item;

      return `
- **${title}**:
  - Fiat Investment: $${fiat.toFixed(2)}
  - Holdings: ${holdings.toFixed(4)} units
  - Current Market Price: $${marketPrice.toFixed(2)} per unit
  - Current Market Value: $${marketValue.toFixed(2)}
  - Profit and loss percentage: ${pnl.toFixed(2)} %
  - 24H Change: ${change >= 0 ? "+" : ""}${change.toFixed(2)}%
      `.trim();
    })
    .join("\n\n");
}

const replacer = (key, value) => {
  if (key === "AnnualDividendGrowth") return undefined;
  if (key === "links") return undefined;
  if (key === "meta") return undefined;
  if (key === "quotes") return undefined;
  if (key === "iconSrc") return undefined;
  return value;
};

const useChat = (portfolioData: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    setIsThinking(true);
    setMessages(currentMessages => [...currentMessages, { content: message, role: "user" }]);

    try {
      const postRequestData = {
        modelId: "@cf/mistral/mistral-7b-instruct-v0.1",
        stream: false,
        options: {
          max_tokens: 2000,
          messages: [
            {
              role: "system",
              content: `${SYSTEM_PROMPT}\nContext, portfolio data: ${formatPortfolioToHumanReadable(
                JSON.parse(JSON.stringify(portfolioData, replacer))
              )}`
            }
          ]
            .concat(messages)
            .concat([{ content: message, role: "user" }]) // appended in end because there's a delay in updating messages
        }
      };

      const response = await api.aiChat(postRequestData);

      if (response.status === 200 && response.data.success) {
        setMessages(currentMessages => [
          ...currentMessages,
          { content: response.data.result.response, role: "system" }
        ]);
      } else if (response.data.errors?.length > 0) {
        setMessages(currentMessages => [
          ...currentMessages,
          {
            content: "Sorry, something went wrong with the analysis. Please try again later.",
            role: "error"
          }
        ]);
      } else {
        setMessages(currentMessages => [
          ...currentMessages,
          {
            content: "An unexpected error occurred. Please try again later.",
            role: "error"
          }
        ]);
      }
    } catch (err) {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          content:
            "Unable to connect to the server. Please check your network connection and try again.",
          role: "error"
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return {
    messages,
    isThinking,
    messagesEndRef,
    handleSendMessage
  };
};

export default useChat;
