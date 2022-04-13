import React, { FC } from 'react';
import styles from './WeekP.module.scss';

interface WeekPProps {}

const WeekP: FC<WeekPProps> = () => (
  <div className={styles.WeekP} data-testid="WeekP">
    WeekP Component
  </div>
);

export default WeekP;
