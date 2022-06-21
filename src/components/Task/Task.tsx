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
  wholeDay?: boolean;
}

const Task: FC<TaskProps> = ({
  title = "بدون عنوان",
  startTime,
  endTime,
  wholeDay,
}) => (
  <div className={`${styles.Task} colWhite owl-mright `} data-testid="Task">
    <span className={styles.title}>{title || "بدون عنوان"}</span>

    {!wholeDay ? (
      <>
        <span>{convertAMPMtoPersia(convertMinutesToHours(startTime))}</span>
        <span>
          {convertAMPMtoPersia(convertMinutesToHours(startTime + endTime))}
        </span>{" "}
      </>
    ) : null}
  </div>
);

export default Task;
