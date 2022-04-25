import React, { FC } from "react";
import {
  convertAMPMtoPersia,
  convertMinutesToHours,
} from "../../utils/helpers";
import styles from "./Task.module.scss";

interface TaskProps {
  title?: string;
  endTime: number;
  startTime: number;
}

const Task: FC<TaskProps> = ({ title = "بدون عنوان", startTime, endTime }) => (
  <div className={`${styles.Task} colWhite owl-mtop`} data-testid="Task ">
    <div className={styles.title}>{title || "بدون عنوان"}</div>
    <div className={`${styles.time} owl-mright`}>
      <span>{convertAMPMtoPersia(convertMinutesToHours(startTime))}</span>
      <span>
        {convertAMPMtoPersia(convertMinutesToHours(startTime + endTime))}
      </span>
    </div>
    <div className={styles.location}></div>
  </div>
);

export default Task;
