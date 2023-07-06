import { FC } from "react";
import { Tooltip } from "@mantine/core";

type TooltipWrapperProps = {
  label: string;
  color: string;
  // eslint-disable-next-line react/require-default-props
  children?: unknown;
};

const TooltipWrapper: FC<TooltipWrapperProps> = ({ label, color, children }) => (
  <Tooltip
    label={label}
    color={color}
    transitionProps={{ transition: "fade", duration: 300, timingFunction: "ease" }}
    withArrow
  >
    {children}
  </Tooltip>
);

export default TooltipWrapper;
