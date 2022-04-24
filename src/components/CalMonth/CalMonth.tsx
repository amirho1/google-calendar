import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import {
  convertFinglishMonthToPersian,
  dateHelper,
  indexOfFirstDayOfMonthInWeek,
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
  className?: string;
  onDateChange: (newDate: Moment) => void;
}

const CalMonth: FC<CalMonthProps> = ({
  width = "100%",
  height = "100%",
  className,
  onDateChange,
}) => {
  const {
    year: currentYear,
    monthName: currentMonthName,
    month: currentMonth,
    day: currentDay,
  } = dateHelper();

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);
  date.locale("fa");
  const [days, setDays] = useState(calculateDaysOrder(date));
  const [month, setMonth] = useState(+date.format("jMM"));
  const [year, setYear] = useState(+currentYear);
  const [monthName, setMonthName] = useState(currentMonthName);
  const monthDaysCount = useMemo(
    () => moment.jDaysInMonth(year, month - 1),
    [month, year]
  );
  const firstDayOfMonthInWeek = indexOfFirstDayOfMonthInWeek(
    moment(`${year}/${month}/1`, "jYYYY/jMM/jDD")
  );

  const onDateClick = useCallback(
    (year: number, month: number, day: number) => {
      onDateChange(moment(`${year}/${month}/${day}`, "jYYYY/jMM/jDD"));
    },
    [onDateChange]
  );

  const mappedRows = useMemo(() => {
    let totalIndex = 0;
    return days.map(row => {
      const newRow: { [props: string]: JSX.Element } = {};
      weekDaysInPersianLetters.forEach((letter, index) => {
        const isCurrentDay =
          year === currentYear &&
          month === currentMonth &&
          row[index] === currentDay &&
          totalIndex >= firstDayOfMonthInWeek &&
          totalIndex <= monthDaysCount + firstDayOfMonthInWeek;

        totalIndex++;
        return (newRow[letter] = (
          <HoverCircle
            width="30px"
            height="30px"
            className={`pointer`}
            backgroundColor={isCurrentDay ? `var(--blue)` : undefined}
            hover={!isCurrentDay}
            background={isCurrentDay}>
            <div
              style={{ color: isCurrentDay ? "white" : undefined }}
              onClick={() => onDateClick(year, month, row[index])}>
              {row[index]}
            </div>
          </HoverCircle>
        ));
      });
      return newRow;
    });
  }, [
    currentDay,
    currentMonth,
    currentYear,
    days,
    firstDayOfMonthInWeek,
    month,
    monthDaysCount,
    onDateClick,
    year,
  ]);

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
            width="30px"
            height="30px"
            dataTip={weekDaysInPersianWord[index]}>
            <div>{value.name}</div>
          </HoverCircle>
        ),
      })),
    []
  );

  return (
    <div
      className={`${styles.CalMonth} ${className}`}
      onClick={e => {
        e.stopPropagation();
      }}
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
