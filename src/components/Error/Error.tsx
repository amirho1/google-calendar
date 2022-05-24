import React, { FC } from "react";
import styles from "./Error.module.scss";
import { CgDanger } from "react-icons/cg";

interface ErrorProps {
  message?: string | undefined | null;
  className?: string;
}

const Error: FC<ErrorProps> = ({ message, className }) => {
  if (!message) return null;
  return (
    <div
      className={`${styles.Error}  ${className} owl-mright`}
      data-testid="Error">
      <CgDanger className={styles.icon} />
      <span>{message}</span>
    </div>
  );
};

export default Error;
