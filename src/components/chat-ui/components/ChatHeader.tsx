import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { IconDownload, ResetIcon, SettingsIcon, InfoIcon } from "../icons";
import DoubleClickButton from "../../double-click-button";
import RiskConfigFlyout, { RiskConfig } from "./RiskConfigFlyout";
import InfoFlyout from "./InfoFlyout";

interface ChatHeaderProps {
  onDownload: () => void;
  onSettingsClick: () => void;
  riskConfig: RiskConfig;
  handleConfigChange: (config: RiskConfig) => void;
  totalTokens: number;
  portfolioData: string;
  systemPrompt: string;
  onPromptChange: (prompt: string) => void;
}

const ChatHeader = ({
  onDownload,
  onSettingsClick,
  riskConfig,
  handleConfigChange,
  totalTokens,
  portfolioData,
  systemPrompt,
  onPromptChange
}: ChatHeaderProps) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [isInfoFlyoutOpen, setIsInfoFlyoutOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Anavrin AI</h2>
        <span className="text-xs text-muted-foreground">{totalTokens} tokens used</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDownload}>
          <IconDownload className="h-4 w-4" />
          <span className="sr-only">Download chat</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ResetIcon className="h-4 w-4" />
          <span className="sr-only">Reset chat</span>
        </Button>
        <DoubleClickButton
          onClick={async () => {
            // TODO: Implement clear chat functionality
          }}
          label={<ResetIcon className="h-4 w-4" />}
          className="rounded bg-transparent p-1 font-bold text-white"
          activeClassName="bg-red-500 hover:bg-red-800"
          inactiveClassName="bg-charcoal-300 hover:bg-red-400"
          tooltipLabel="Double click to clear chat"
          activatedTooltipLabel="Click again to clear chat!"
        />
        <DropdownMenu open={isFlyoutOpen} onOpenChange={setIsFlyoutOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onSettingsClick}>
              <SettingsIcon className="h-4 w-4" />
              <span className="sr-only">Open settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full z-10" align="end" side="bottom" sideOffset={6}>
            <RiskConfigFlyout
              onClose={() => setIsFlyoutOpen(false)}
              config={riskConfig}
              onConfigChange={handleConfigChange}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu open={isInfoFlyoutOpen} onOpenChange={setIsInfoFlyoutOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <InfoIcon className="h-4 w-4" />
              <span className="sr-only">Open info</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full z-10" align="end" side="bottom" sideOffset={6}>
            <InfoFlyout
              onClose={() => setIsInfoFlyoutOpen(false)}
              riskConfig={riskConfig}
              portfolioData={portfolioData}
              systemPrompt={systemPrompt}
              onPromptChange={onPromptChange}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
