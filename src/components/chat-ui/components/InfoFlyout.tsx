import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { X } from "lucide-react";
import { RiskConfig } from "./RiskConfigFlyout";

interface InfoFlyoutProps {
  onClose: () => void;
  riskConfig: RiskConfig;
  portfolioData: string;
  systemPrompt: string;
  onPromptChange?: (prompt: string) => void;
}

const InfoFlyout = ({
  onClose,
  riskConfig,
  portfolioData,
  systemPrompt,
  onPromptChange
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
