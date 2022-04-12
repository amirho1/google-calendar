import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import {
  convertFinglishMonthToPersian,
  weekDaysInPersianLetters,
  weekDaysInPersianWord,
} from "../../utils/helpers";
import DateD from "../DateD/DateD";
import HoverCircle from "../HoverCircle/HoverCircle";
import { onCLickT } from "../MonthChanger/MonthChanger";
import Table, { HeadersI } from "../Table/Table";
import styles from "./CalMonth.module.scss";
import calculateDaysOrder from "./utils/calculateDaysOrder";

interface CalMonthProps {
  width?: string;
  height?: string;
}

const CalMonth: FC<CalMonthProps> = ({ width = "100%", height = "100%" }) => {
  const [currentMonthName, currentYear] = useSelector<
    ReduxStateI,
    [string, string]
  >(state => [state.date.monthName, state.date.date.format("jYYYY")]);

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);
  const [days, setDays] = useState(calculateDaysOrder(date));
  const [month, setMonth] = useState(+date.format("jMM"));
  const [year, setYear] = useState(+currentYear);
  const [monthName, setMonthName] = useState(currentMonthName);

  const mappedRows = useMemo(() => {
    return days.map(row => {
      const newRow: { [props: string]: JSX.Element } = {};
      weekDaysInPersianLetters.forEach(
        (letter, index) =>
          (newRow[letter] = (
            <HoverCircle
              style={{ width: "30px", height: "30px", cursor: "pointer" }}>
              <div>{row[index]}</div>
            </HoverCircle>
          ))
      );
      return newRow;
    });
  }, [days]);

  useEffect(() => {
    const dMoment = moment(`${year}/${month}`, "jYYYY/jMM");
    setMonthName(convertFinglishMonthToPersian(dMoment.format("jMMMM")));
    setDays(calculateDaysOrder(dMoment));
  }, [month, year]);

  const onCLickNext = useCallback<onCLickT>(
    e => {
      e.stopPropagation();
      if (month + 1 > 12) {
        setMonth(1);
        setYear(previous => previous + 1);
      } else {
        setMonth(previous => previous + 1);
      }
    },
    [month]
  );

  const onClickPrevious = useCallback<onCLickT>(
    e => {
      e.stopPropagation();

      if (month - 1 < 1) {
        setMonth(12);
        setYear(previous => previous - 1);
      } else {
        setMonth(previous => previous - 1);
      }
    },
    [month]
  );

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
      <DateD
        monthName={monthName}
        onCLickNext={onCLickNext}
        onClickPrevious={onClickPrevious}
        year={year}
      />

      <div className={styles.Main}>
        <Table
          headers={headers}
          rows={mappedRows}
          theadClassName={styles.theadClassName}
          thClassName={styles.thClassName}
          tdClassName={styles.tdClassName}></Table>
      </div>
    </div>
  );
};

export default CalMonth;
