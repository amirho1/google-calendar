import React, { FC } from "react";
import styles from "./Fade.module.scss";

interface FadeProps {
  display: boolean;
}

const Fade: FC<FadeProps> = ({ display }) => {
  if (!display) return null;

  return <div className={styles.Fade} data-testid="Fade"></div>;
};

export default Fade;
