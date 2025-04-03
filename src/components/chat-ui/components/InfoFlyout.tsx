import { Button } from "components/ui/button";
import { X } from "lucide-react";

interface InfoFlyoutProps {
  onClose: () => void;
}

const InfoFlyout = ({ onClose }: InfoFlyoutProps) => (
  <div className="w-96 rounded-lg border border-border bg-card p-2 shadow-lg">
    <div className="flex items-center justify-between px-4 pt-4">
      <h2 className="text-lg font-semibold">Information</h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
    <div className="mt-6 p-4">
      <p className="text-sm text-muted-foreground">
        This is the information flyout. Add any relevant details or instructions here.
      </p>
    </div>
  </div>
);

export default InfoFlyout;
