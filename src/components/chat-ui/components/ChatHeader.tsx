import { Button } from "components/ui/button";
import { IconDownload, ResetIcon, SettingsIcon, InfoIcon } from "../icons";
import DoubleClickButton from "../../double-click-button";

interface ChatHeaderProps {
  onDownload: () => void;
}

const ChatHeader = ({ onDownload }: ChatHeaderProps) => (
  <div className="flex items-center justify-between">
    <h1 className="text-sm font-bold">Secure Chat</h1>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onDownload}>
        <IconDownload className="h-4 w-4" />
        <span className="sr-only">Download</span>
      </Button>
      <Button variant="ghost" size="icon">
        <ResetIcon className="h-4 w-4" />
        <span className="sr-only">Reset</span>
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
      <Button variant="ghost" size="icon">
        <SettingsIcon className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </Button>
      <Button variant="ghost" size="icon">
        <InfoIcon className="h-4 w-4" />
        <span className="sr-only">Info</span>
      </Button>
    </div>
  </div>
);

export default ChatHeader;
