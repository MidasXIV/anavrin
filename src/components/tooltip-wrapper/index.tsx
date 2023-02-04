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
    transition="fade"
    transitionDuration={300}
    transitionTimingFunction="ease"
    withArrow
  >
    {children}
  </Tooltip>
);

export default TooltipWrapper;
