import React, { FC } from "react";
import Day from "../../components/Day/Day";
import styles from "./DayP.module.scss";

interface DayPProps {}

const DayP: FC<DayPProps> = () => (
  <div className={styles.DayP} data-testid="DayP">
    <Day />
  </div>
);

export default DayP;
