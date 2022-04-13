import React, { FC } from "react";
import styles from "./TimeLine.module.scss";

interface TimeLineProps {
  y: number;
  color: string;
}

const TimeLine: FC<TimeLineProps> = ({ y, color }) => (
  <div
    style={{ backgroundColor: color, top: `${y}px` }}
    className={styles.TimeLine}
    data-testid="TimeLine">
    <div style={{ backgroundColor: color }} className={styles.circle}></div>
  </div>
);

export default TimeLine;
