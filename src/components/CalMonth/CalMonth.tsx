import React, { FC, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import {
  weekDaysInPersianLetters,
  weekDaysInPersianWord,
} from "../../utils/helpers";
import HoverCircle from "../HoverCircle/HoverCircle";
import MonthChanger, { onCLickT } from "../MonthChanger/MonthChanger";
import Table, { HeadersI } from "../Table/Table";
import styles from "./CalMonth.module.scss";
import calculateDaysOrder from "./utils/calculateDaysOrder";

interface CalMonthProps {
  width?: string;
  height?: string;
}

const CalMonth: FC<CalMonthProps> = ({ width = "100%", height = "100%" }) => {
  const date = useSelector<ReduxStateI, Date>(state => state.date.date);

  const [monthName, year] = useSelector<ReduxStateI, [string, string]>(
    state => [
      state.date.monthName,
      new Intl.DateTimeFormat("fa", { year: "numeric" }).format(
        state.date.date
      ),
    ]
  );

  const onClickPrevious = useCallback<onCLickT>(event => {
    console.log("previous");
  }, []);
  const onCLickNext = useCallback<onCLickT>(event => {
    console.log("next");
  }, []);

  const headers = useMemo<HeadersI>(
    () =>
      weekDaysInPersianLetters.map((letter, index) => ({
        name: letter,
        cb: value => (
          <HoverCircle
            style={{ width: "30px", height: "30px" }}
            data-tip={weekDaysInPersianWord[index]}>
            <div>{value.name}</div>
          </HoverCircle>
        ),
      })),
    []
  );
  return (
    <div
      className={styles.CalMonth}
      data-testid="CalMonth"
      style={{ width, height }}>
      <div className={`${styles.Head} f-between`}>
        <div className={`${styles.YearMonthWrapper} f-between`}>
          <span id={"month"}>{monthName}</span>
          <span id={"year"}>{year}</span>
        </div>
        <MonthChanger
          onClickPrevious={onClickPrevious}
          onCLickNext={onCLickNext}
        />
      </div>

      <div className={styles.Main}>
        <Table
          headers={headers}
          rows={calculateDaysOrder(date)}
          theadClassName={styles.theadClassName}
          thClassName={styles.thClassName}
          tdClassName={styles.tdClassName}></Table>
      </div>
    </div>
  );
};

export default CalMonth;
