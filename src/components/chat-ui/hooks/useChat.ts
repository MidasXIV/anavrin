import { useState, useRef, useEffect } from "react";
import api from "services/create-service";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";
import { RiskConfig } from "../components/RiskConfigFlyout";
import { AIModel } from "../components/InfoFlyout";

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
 * Formats stock portfolio data into a human-readable string.
 * @param portfolio - Array of stock portfolio objects.
 * @returns A formatted string describing the stock portfolio.
 */
function formatStockPortfolioToHumanReadable(portfolio: any[]): string {
  if (!Array.isArray(portfolio) || portfolio.length === 0) {
    return "No stock portfolio data available.";
  }

  return portfolio
    .map(item => {
      const {
        title,
        symbol,
        shares,
        avgPrice,
        marketPrice,
        costBasis,
        marketValue,
        earningPerShare,
        pricePerEarning,
        dividendAmount,
        dividendYield,
        yieldOnCost,
        income,
        beta,
        exchange,
        marketCap
      } = item;

      return `
- **${title} (${symbol})**:
  - Shares: ${shares}
  - Average Purchase Price: $${parseFloat(avgPrice).toFixed(2)}
  - Current Market Price: $${marketPrice.toFixed(2)}
  - Cost Basis: $${costBasis.toFixed(2)}
  - Market Value: $${marketValue.toFixed(2)}
  - Earnings Per Share (EPS): $${earningPerShare.toFixed(2)}
  - Price-to-Earnings Ratio (P/E): ${pricePerEarning.toFixed(2)}
  - Dividend Amount: $${parseFloat(dividendAmount).toFixed(2)}
  - Dividend Yield: ${dividendYield}
  - Yield on Cost: ${yieldOnCost.toFixed(2)}%
  - Annual Income: $${income.toFixed(2)}
  - Beta: ${beta.toFixed(2)}
  - Exchange: ${exchange}
  - Market Cap: ${marketCap}
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

/**
 * Determines if a portfolio is of type "crypto" or "stocks".
 * @param portfolio - Array of portfolio objects.
 * @returns "crypto" if the portfolio is a crypto portfolio, "stocks" if it's a stock portfolio.
 */
function getPortfolioType(portfolio: any[]): "crypto" | "stocks" | "unknown" {
  if (!Array.isArray(portfolio) || portfolio.length === 0) {
    return "unknown";
  }

  const firstItem = portfolio[0];
  if ("fiat" in firstItem && "holdings" in firstItem && "marketPrice" in firstItem) {
    return "crypto";
  }
  if ("shares" in firstItem && "avgPrice" in firstItem && "earningPerShare" in firstItem) {
    return "stocks";
  }

  return "unknown";
}

/**
 * Formats a portfolio based on its type (crypto or stocks).
 * @param portfolio - Array of portfolio objects.
 * @returns A formatted string describing the portfolio.
 */
function formatPortfolio(portfolio: any[]): string {
  const portfolioType = getPortfolioType(portfolio);

  switch (portfolioType) {
    case "crypto":
      return formatPortfolioToHumanReadable(portfolio);
    case "stocks":
      return formatStockPortfolioToHumanReadable(portfolio);
    default:
      return "Unknown portfolio type or no data available.";
  }
}

const replacer = (key: string, value: any) => {
  if (key === "AnnualDividendGrowth") return undefined;
  if (key === "links") return undefined;
  if (key === "meta") return undefined;
  if (key === "quotes") return undefined;
  if (key === "iconSrc") return undefined;
  return value;
};

const useChat = ({
  portfolioData,
  riskConfig,
  systemPrompt,
  selectedModel
}: {
  portfolioData: any[];
  riskConfig: RiskConfig;
  systemPrompt: string;
  selectedModel: AIModel;
}) => {
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
        modelId: selectedModel,
        stream: false,
        options: {
          max_tokens: 2000,
          messages: [
            {
              role: "system",
              content: `${systemPrompt}\nContext, portfolio data: ${formatPortfolio(
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

      const handleMistralResponse = async response => {
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
          throw new Error(`API Errors: ${response.data.errors.join(", ")}`);
        }
      };

      const handleGeminiResponse = async (response: any) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          // Extract and concatenate all text parts from the response
          const concatenatedText = response.data
            .flatMap((item: any) =>
              item.candidates.flatMap((candidate: any) =>
                candidate.content.parts.map((part: any) => part.text)
              )
            )
            .join("");

          const lastIndex = response.data.length - 1;
          const lastResponse = response.data[lastIndex];
          const usage = {
            prompt_tokens: lastResponse.usageMetadata?.promptTokenCount || 0,
            completion_tokens: lastResponse.usageMetadata?.candidatesTokenCount || 0,
            total_tokens: 0 // Initialize total_tokens
          };
          usage.total_tokens = usage.prompt_tokens + usage.completion_tokens;

          // // Extract token usage metadata
          // const totalTokens = response.data.reduce(
          //   (sum: number, item: any) => sum + (item.usageMetadata?.totalTokenCount || 0),
          //   0
          // );

          // Create the assistant message
          const assistantMessage: Message = {
            content: concatenatedText,
            role: "assistant",
            usage,
            timestamp: new Date() // Use Date object directly
          };

          // Update the messages state
          setMessages(currentMessages => [...currentMessages, assistantMessage]);
          setTotalTokens(prev => prev + usage.total_tokens);
        } else {
          console.error("Unexpected Gemini API response:", response);
          throw new Error("Unexpected Gemini API response format.");
        }
      };

      try {
        if (selectedModel.startsWith("gemini")) {
          await handleGeminiResponse(response);
        } else {
          await handleMistralResponse(response);
        }
      } catch (err) {
        if (err.message.includes("API Errors")) {
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
