import { useState, useRef, useEffect } from "react";
import api from "services/create-service";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";
import { RiskConfig } from "../components/RiskConfigFlyout";

/**
 * Formats portfolio data into a human-readable string.
 * @param portfolio - Array of portfolio objects.
 * @returns A formatted string describing the portfolio.
 */
function formatPortfolioToHumanReadable(portfolio: any[]): string {
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

/**
 * Formats risk configuration into a human-readable string.
 * @param config - Risk configuration object.
 * @returns A formatted string describing the risk preferences.
 */
function formatRiskConfigToHumanReadable(config: RiskConfig): string {
  return `
- **Risk Tolerance**: ${config.riskTolerance}/10
- **Investment Horizon**: ${config.investmentHorizon}
- **Investment Goals**: ${config.investmentGoals.join(", ")}
- **Preferred Asset Types**: ${config.preferredAssetTypes.join(", ")}
  `.trim();
}

const replacer = (key: string, value: any) => {
  if (key === "AnnualDividendGrowth") return undefined;
  if (key === "links") return undefined;
  if (key === "meta") return undefined;
  if (key === "quotes") return undefined;
  if (key === "iconSrc") return undefined;
  return value;
};

const useChat = (portfolioData: any[], riskConfig: RiskConfig, systemPrompt: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages(currentMessages => [
      ...currentMessages,
      { content: message, role: "user", timestamp: new Date() }
    ]);

    try {
      const postRequestData = {
        modelId: "@cf/mistral/mistral-7b-instruct-v0.1",
        stream: false,
        options: {
          max_tokens: 2000,
          messages: [
            {
              role: "system",
              content: `${systemPrompt}\nContext, portfolio data: ${formatPortfolioToHumanReadable(
                JSON.parse(JSON.stringify(portfolioData, replacer))
              )}\n\nUser risk preferences: ${formatRiskConfigToHumanReadable(riskConfig)}`
            }
          ]
            .concat(messages)
            .concat([{ content: message, role: "user" }]) // appended in end because there's a delay in updating messages
        }
      };

      console.log(postRequestData);
      const response = await api.aiChat(postRequestData);

      if (response.status === 200 && response.data.success) {
        const aiResponse = response.data.result.response;
        const assistantMessage: Message = {
          content: aiResponse,
          role: "assistant",
          usage: response.data.result.usage,
          timestamp: new Date() // Use Date object directly instead of string
        };
        setMessages(currentMessages => [...currentMessages, assistantMessage]);
        setTotalTokens(prev => prev + (response.data.result.usage?.total_tokens || 0));
      } else if (response.data.errors && response.data.errors.length > 0) {
        console.error("API Errors:", response.data.errors);
        setMessages(currentMessages => [
          ...currentMessages,
          {
            content: "Sorry, something went wrong with the analysis. Please try again later.",
            role: "error",
            timestamp: new Date() // Fix timestamp type mismatch by using Date object directly
          }
        ]);
      } else {
        console.warn("Unexpected response:", response);
        setMessages(currentMessages => [
          ...currentMessages,
          {
            content: "An unexpected error occurred. Please try again later.",
            role: "error",
            timestamp: new Date() // Fix timestamp type mismatch by using Date object directly
          }
        ]);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessages(currentMessages => [
        ...currentMessages,
        {
          content:
            "Unable to connect to the server. Please check your network connection and try again.",
          role: "error",
          timestamp: new Date() // Fix timestamp type mismatch by using Date object directly
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    totalTokens,
    handleSendMessage,
    messagesEndRef
  };
};

export default useChat;
