import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RiskConfig } from "./RiskConfigFlyout";

// Define available AI models
export enum AIModel {
  MISTRAL_7B = "@cf/mistral/mistral-7b-instruct-v0.1",
  MISTRAL_8X7B = "@cf/mistral/mistral-8x7b-instruct-v0.1",
  LLAMA_2_7B = "@cf/meta/llama-2-7b-chat-int8",
  LLAMA_2_13B = "@cf/meta/llama-2-13b-chat-int8",
  GEMINI_PRO_PREVIEW = "gemini-2.5-pro-preview-03-25",
  GEMINI_FLASH = "gemini-2.0-flash",
  GPT_3_5 = "gpt-3.5-turbo",
  GPT_4 = "gpt-4"
}

// Model-specific information
export const modelInfo = {
  [AIModel.MISTRAL_7B]: {
    name: "Mistral 7B",
    description: "Fast and efficient 7B parameter model",
    provider: "Cloudflare"
  },
  [AIModel.MISTRAL_8X7B]: {
    name: "Mistral 8x7B",
    description: "Powerful 8x7B parameter model with improved reasoning",
    provider: "Cloudflare"
  },
  [AIModel.LLAMA_2_7B]: {
    name: "Llama 2 7B",
    description: "Meta's 7B parameter model with good performance",
    provider: "Cloudflare"
  },
  [AIModel.LLAMA_2_13B]: {
    name: "Llama 2 13B",
    description: "Meta's larger 13B parameter model with enhanced capabilities",
    provider: "Cloudflare"
  },
  [AIModel.GEMINI_PRO_PREVIEW]: {
    name: "Gemini Pro",
    description: "Google's advanced language model",
    provider: "Google"
  },
  [AIModel.GEMINI_FLASH]: {
    name: "Gemini 2.0 Flash",
    description: "Google's advanced language model",
    provider: "Google"
  },
  [AIModel.GPT_3_5]: {
    name: "GPT-3.5 Turbo",
    description: "OpenAI's efficient and cost-effective model",
    provider: "OpenAI"
  },
  [AIModel.GPT_4]: {
    name: "GPT-4",
    description: "OpenAI's most advanced model with superior reasoning",
    provider: "OpenAI"
  }
};

interface InfoFlyoutProps {
  onClose: () => void;
  riskConfig: RiskConfig;
  portfolioData: string;
  systemPrompt: string;
  onPromptChange?: (prompt: string) => void;
  selectedModel: AIModel;
  onModelChange?: (model: AIModel) => void;
}

const InfoFlyout = ({
  onClose,
  riskConfig,
  portfolioData,
  systemPrompt,
  onPromptChange,
  selectedModel,
  onModelChange
}: InfoFlyoutProps) => (
  <div className="w-96 rounded-lg border border-border bg-card p-2 shadow-lg">
    <div className="flex items-center justify-between px-4">
      <h2 className="text-lg font-semibold">Chat Information</h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>

    <div className="mt-4 max-h-[24rem] space-y-4 overflow-auto p-4">
      <div className="space-y-2">
        <Label>AI Model</Label>
        <Select value={selectedModel} onValueChange={value => onModelChange?.(value as AIModel)}>
          <SelectTrigger>
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(AIModel).map(model => (
              <SelectItem key={model} value={model}>
                {modelInfo[model].name} ({modelInfo[model].provider})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">{modelInfo[selectedModel].description}</p>
      </div>

      <div className="space-y-2">
        <Label>System Prompt</Label>
        <Textarea
          value={systemPrompt}
          onChange={e => onPromptChange?.(e.target.value)}
          className="min-h-[300px] resize-none"
          placeholder="Enter system prompt..."
        />
      </div>

      <div className="space-y-2">
        <Label>Risk Configuration</Label>
        <div className="rounded-md border p-3 text-sm">
          <p>Risk Tolerance: {riskConfig.riskTolerance}/10</p>
          <p>Investment Horizon: {riskConfig.investmentHorizon}</p>
          <p>Investment Goals: {riskConfig.investmentGoals.join(", ")}</p>
          <p>Preferred Assets: {riskConfig.preferredAssetTypes.join(", ")}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Portfolio Data</Label>
        <div className="rounded-md border bg-muted p-3 text-sm">
          <pre className="overflow-auto font-mono text-xs">
            {JSON.stringify(JSON.parse(portfolioData), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  </div>
);

export default InfoFlyout;
