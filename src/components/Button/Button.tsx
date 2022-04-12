import React, { FC, HTMLAttributes } from "react";
import { PrimitivesT } from "../Table/Table";
import styles from "./Button.module.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | PrimitivesT;
  dataTip?: string;
}

const Button: FC<ButtonProps> = props => (
  <button
    {...props}
    data-tip={props.dataTip}
    className={`${styles.Button} ${props.className}`}
    data-testid="Button">
    {props.children}
  </button>
);

export default Button;
