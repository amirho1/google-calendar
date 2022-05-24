import React, { forwardRef, HTMLAttributes } from "react";
import Tippy from "@tippyjs/react";
import { PrimitivesT } from "../Table/Table";
import styles from "./Button.module.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | PrimitivesT;
  dataTip?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { dataTip, type = "button", ...rest } = { ...props };

  if (!dataTip)
    return (
      <button
        ref={ref}
        type={type}
        {...rest}
        className={`${styles.Button} ${props.className}`}
        data-testid="Button">
        {props.children}
      </button>
    );

  return (
    <Tippy content={dataTip}>
      <button
        type={type}
        ref={ref}
        {...rest}
        className={`${styles.Button} ${props.className}`}
        data-testid="Button">
        {props.children}
      </button>
    </Tippy>
  );
});

export default Button;
