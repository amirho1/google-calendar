import React, { forwardRef, HTMLAttributes } from "react";
import { Tooltip } from "react-tippy";
import { PrimitivesT } from "../Table/Table";
import styles from "./Button.module.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | PrimitivesT;
  dataTip?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { dataTip, ...rest } = { ...props };
  return (
    <Tooltip title={dataTip}>
      <button
        ref={ref}
        {...rest}
        className={`${styles.Button} ${props.className}`}
        data-testid="Button">
        {props.children}
      </button>
    </Tooltip>
  );
});

export default Button;
