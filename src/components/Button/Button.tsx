import React, { forwardRef, HTMLAttributes } from "react";
import Tippy from "@tippyjs/react";
import { PrimitivesT } from "../Table/Table";
import styles from "./Button.module.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | PrimitivesT;
  dataTip?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { dataTip, ...rest } = { ...props };

  if (!dataTip)
    return (
      <button
        ref={ref}
        {...rest}
        className={`${styles.Button} ${props.className}`}
        data-testid="Button">
        {props.children}
      </button>
    );

  return (
    <Tippy content={dataTip}>
      <button
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
