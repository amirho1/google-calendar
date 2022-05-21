import React, { FC } from "react";
import styles from "./Logo.module.scss";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <h2 className={styles.logo}>
      <span className={styles.blue}>G</span>
      <span className={styles.red}>o</span>
      <span className={styles.yellow}>o</span>
      <span className={styles.blue}>g</span>
      <span className={styles.green}>l</span>
      <span className={styles.red}>e</span>
    </h2>
  );
};

export default Logo;
