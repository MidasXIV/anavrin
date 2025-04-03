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
  content: string;
  onClick: () => void;
}

export interface ChatLayoutProps {
  portfolioData: any; // TODO: Define proper portfolio type
}

export interface IconProps {
  className?: string;
}
