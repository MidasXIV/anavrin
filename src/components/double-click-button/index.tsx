import { Tooltip } from "@mantine/core";
import { useState } from "react";

/**
 * A button component that executes an onClick event only on double click.
 * resets after 3 seconds
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS classes to apply to the button.
 * @param {function} props.onClick - The function to execute on double click.
 * @param {string} [props.label] - The label for the button.
 * @param {string} [props.tooltipLabel] - The label for the Tooltip when button is active.
 * @param {string} [props.activeClassName='bg-red-500'] - The CSS class to apply when button is active.
 * @param {string} [props.inactiveClassName='bg-gray-500'] - The CSS class to apply when button is inactive.
 *
 * @returns {JSX.Element} - The DoubleClickButton component.
 */

function DoubleClickButton({
  onClick,
  label,
  tooltipLabel = "",
  className,
  activeClassName,
  inactiveClassName
}): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    setTimeout(() => setIsActive(false), 3000);
    if (isActive && onClick) {
      onClick();
    }
  };

  return (
    <Tooltip
      label={tooltipLabel}
      opened={isActive}
      transitionProps={{ transition: 'fade', duration: 200 }}
      position="bottom-end"
    >
      <button
        type="button"
        onClick={handleClick}
        className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
      >
        {label}
      </button>
    </Tooltip>
  );
}

export default DoubleClickButton;
