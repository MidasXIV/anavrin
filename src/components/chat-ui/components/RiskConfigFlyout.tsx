import { useState } from "react";
import { Button } from "components/ui/button";
import { Slider } from "components/ui/slider";
import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Checkbox } from "components/ui/checkbox";
import { X } from "lucide-react";

export interface RiskConfig {
  riskTolerance: number; // 1-10 scale
  investmentHorizon: "short" | "medium" | "long";
  investmentGoals: string[];
  preferredAssetTypes: string[];
}

interface RiskConfigFlyoutProps {
  // isOpen: boolean;
  onClose: () => void;
  config: RiskConfig;
  onConfigChange: (config: RiskConfig) => void;
}

const RiskConfigFlyout = ({ config, onClose, onConfigChange }: RiskConfigFlyoutProps) => {
  const [localConfig, setLocalConfig] = useState<RiskConfig>(config);

  const handleSave = () => {
    onConfigChange(localConfig);
    onClose();
  };

  // if (!isOpen) return null;

  return (
    // <div className="fixed inset-y-0 right-0 z-50 w-96 bg-card p-6 shadow-lg">
    <div className="w-96 rounded-lg border border-border bg-card p-2 shadow-lg">
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-lg font-semibold">Investment Preferences</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="mt-6 max-h-[24rem] space-y-6 overflow-auto p-4">
        <div className="space-y-2">
          <Label htmlFor="risk-tolerance">Risk Tolerance (1-10)</Label>
          <Slider
            id="risk-tolerance"
            min={1}
            max={10}
            step={1}
            value={[localConfig.riskTolerance]}
            onValueChange={value => setLocalConfig({ ...localConfig, riskTolerance: value[0] })}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Conservative</span>
            <span>Aggressive</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Investment Horizon</Label>
          <RadioGroup
            className="max-w-[400px] gap-2"
            value={localConfig.investmentHorizon}
            onValueChange={value =>
              setLocalConfig({
                ...localConfig,
                investmentHorizon: value as "short" | "medium" | "long"
              })
            }
          >
            <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <RadioGroupItem
                value="short"
                id="short"
                aria-describedby="short-description"
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-2">
                <Label htmlFor="short">
                  Short-term{" "}
                  <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    (1-3 years)
                  </span>
                </Label>
                <p id="short-description" className="text-xs text-muted-foreground">
                  Suitable for investors who need access to their funds in the near future.
                </p>
              </div>
            </div>
            <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <RadioGroupItem
                value="medium"
                id="medium"
                aria-describedby="medium-description"
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-2">
                <Label htmlFor="medium">
                  Medium-term{" "}
                  <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    (3-7 years)
                  </span>
                </Label>
                <p id="medium-description" className="text-xs text-muted-foreground">
                  Balanced approach for investors with moderate time horizons.
                </p>
              </div>
            </div>
            <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <RadioGroupItem
                value="long"
                id="long"
                aria-describedby="long-description"
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-2">
                <Label htmlFor="long">
                  Long-term{" "}
                  <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    (7+ years)
                  </span>
                </Label>
                <p id="long-description" className="text-xs text-muted-foreground">
                  Ideal for retirement planning and long-term wealth building.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Investment Goals</Label>
          <div className="space-y-2">
            {["Capital Preservation", "Income Generation", "Growth", "Speculation"].map(goal => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={goal}
                  checked={localConfig.investmentGoals.includes(goal)}
                  onCheckedChange={checked => {
                    const newGoals = checked
                      ? [...localConfig.investmentGoals, goal]
                      : localConfig.investmentGoals.filter(g => g !== goal);
                    setLocalConfig({ ...localConfig, investmentGoals: newGoals });
                  }}
                />
                <Label htmlFor={goal}>{goal}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preferred Asset Types</Label>
          <div className="space-y-2">
            {["Stocks", "Bonds", "Cryptocurrencies", "Real Estate", "Commodities"].map(asset => (
              <div key={asset} className="flex items-center space-x-2">
                <Checkbox
                  id={asset}
                  checked={localConfig.preferredAssetTypes.includes(asset)}
                  onCheckedChange={checked => {
                    const newAssets = checked
                      ? [...localConfig.preferredAssetTypes, asset]
                      : localConfig.preferredAssetTypes.filter(a => a !== asset);
                    setLocalConfig({ ...localConfig, preferredAssetTypes: newAssets });
                  }}
                />
                <Label htmlFor={asset}>{asset}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-4">
        <Button className="w-full" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default RiskConfigFlyout;
