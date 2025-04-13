/* eslint-disable camelcase */
import { RiskConfig } from "./components/RiskConfigFlyout";
import { AIModel } from "./components/InfoFlyout";

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface Message {
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
  usage?: TokenUsage;
}

export interface ExampleMessage {
  role: "user" | "assistant";
  message: string;
  subheading: string;
  heading: string;
}

export interface ChatLayoutProps {
  portfolioData: any[];
  // riskConfig: RiskConfig;
  // handleConfigChange: (config: RiskConfig) => void;
  // systemPrompt: string;
  // onPromptChange: (prompt: string) => void;
}

export interface IconProps {
  className?: string;
}
