import React, { FC, forwardRef, HTMLAttributes } from "react";
import { PrimitivesT } from "../Table/Table";
import styles from "./Button.module.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | PrimitivesT;
  dataTip?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { dataTip, ...rest } = { ...props };
  return (
    <button
      ref={ref}
      {...rest}
      data-tip={dataTip}
      className={`${styles.Button} ${props.className}`}
      data-testid="Button">
      {props.children}
    </button>
  );
});

export default Button;
