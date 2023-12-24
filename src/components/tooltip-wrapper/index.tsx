import { FC } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipWrapperProps = {
  label: string;
  color: string;
  // eslint-disable-next-line react/require-default-props
  children?: unknown;
};

const TooltipWrapper: FC<TooltipWrapperProps> = ({ label, color = undefined, children }) => (
  <TooltipProvider>
    <Tooltip
    // color={color}
    // transitionProps={{ transition: "fade", duration: 300, timingFunction: "ease" }}
    // withArrow
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default TooltipWrapper;
