import React, { FC } from "react";
import MonthChanger, { MonthChangerPropsI } from "../MonthChanger/MonthChanger";
import styles from "./DateD.module.scss";

interface DateDProps {
  onClickPrevious: MonthChangerPropsI["onClickPrevious"];
  onCLickNext: MonthChangerPropsI["onCLickNext"];
  year: number;
  monthName: string;
  fontSize?: string;
}

const DateD: FC<DateDProps> = ({
  monthName,
  onCLickNext,
  onClickPrevious,
  year,
  fontSize,
}) => (
  <div className={`${styles.DateD} f-between`} data-testid="DateD">
    <div className={`${styles.YearMonthWrapper} f-between`}>
      <span id={"month"} style={{ fontSize }}>
        {monthName}
      </span>
      <span id={"year"} style={{ fontSize }}>
        {year}
      </span>
    </div>
    <MonthChanger onClickPrevious={onClickPrevious} onCLickNext={onCLickNext} />
  </div>
);

export default DateD;
