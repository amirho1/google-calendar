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

  const nextMonthDaysStartIndex = useMemo(
    () => monthDaysCount + firstDayOfMonthInWeek,
    [firstDayOfMonthInWeek, monthDaysCount]
  );
  const onDateClick = useCallback(
    (year: number, month: number, day: number) => {
      onDateChange(moment(`${year}/${month}/${day}`, "jYYYY/jMM/jDD"));
    },
    [onDateChange]
  );

  const previousMonthLastDay = useMemo(
    () => firstDayOfMonthInWeek - 1,
    [firstDayOfMonthInWeek]
  );

  const whichMonth = useCallback(
    index =>
      index >= nextMonthDaysStartIndex
        ? month + 1
        : index <= previousMonthLastDay
        ? month - 1
        : month,
    [month, nextMonthDaysStartIndex, previousMonthLastDay]
  );

  const mappedRows = useMemo(() => {
    return days.map((row, RowIndex) => {
      const newRow: { [props: string]: JSX.Element } = {};
      weekDaysInPersianLetters.forEach((letter, columnIndex) => {
        const currentIndex = RowIndex * 7 + columnIndex;
        const isCurrentDay =
          year === currentYear &&
          month === currentMonth &&
          row[columnIndex] === currentDay &&
          currentIndex >= firstDayOfMonthInWeek &&
          currentIndex <= monthDaysCount + firstDayOfMonthInWeek;

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
              onClick={() => {
                onDateClick(year, whichMonth(currentIndex), row[columnIndex]);
              }}>
              {row[columnIndex]}
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
    whichMonth,
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
