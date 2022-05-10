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
  <div className={`${styles.Task} colWhite owl-mright `} data-testid="Task">
    <span className={styles.title}>{title || "بدون عنوان"}</span>
    <span>{convertAMPMtoPersia(convertMinutesToHours(startTime))}</span>
    <span>
      {convertAMPMtoPersia(convertMinutesToHours(startTime + endTime))}
    </span>
    <div className={styles.location}></div>
  </div>
);

export default Task;
