/* eslint-disable react/display-name */
/* eslint-disable react/require-default-props */
import cn from "classnames";
import { forwardRef, useRef, ButtonHTMLAttributes } from "react";
import { mergeRefs } from "react-merge-refs";

import LoadingDots from "../loading-dots/loading-dots";

import styles from "./box-button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "slim" | "flat";
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
}

const BoxButton = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;
  const ref = useRef(null);
  const rootClassName = cn(
    styles.root,
    {
      [styles.slim]: variant === "slim",
      [styles.loading]: loading,
      [styles.disabled]: disabled
    },
    className
  );
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="m-0 flex pl-2">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default BoxButton;
