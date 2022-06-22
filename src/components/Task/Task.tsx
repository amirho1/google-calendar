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
  <div className={`${styles.Task} ${ endTime <= 30 ? styles.flex  : "" } colWhite  `} data-testid="Task">
    <p className={`${styles.title} ellipsis`}>{title || "بدون  عنوان"}</p>

    {(!wholeDay && title.length <= 270)? (
      <div>
        <span>{convertAMPMtoPersia(convertMinutesToHours(startTime))}</span>
        <span>
          {convertAMPMtoPersia(convertMinutesToHours(startTime + endTime))}
        </span>{" "}
      </div>
    ) : null}
  </div>
);

export default Task;
