import React, { FC } from "react";
import styles from "./Task.module.scss";

interface TaskProps {}

const Task: FC<TaskProps> = () => (
  <div className={styles.Task} data-testid="Task"></div>
);

export default Task;
