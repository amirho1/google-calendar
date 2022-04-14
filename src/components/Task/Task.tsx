import React, { FC } from "react";
import styles from "./Task.module.scss";

interface TaskProps {
  title?: string;
}

const Task: FC<TaskProps> = ({ title = "موضوع" }) => (
  <div className={styles.Task} data-testid="Task">
    <div className={styles.title}>{title}</div>
    <div className={styles.time}></div>
    <div className={styles.location}></div>
  </div>
);

export default Task;
