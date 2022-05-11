import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import {
  convertFinglishMonthToPersian,
  dateHelper,
  indexOfFirstDayOfMonthInWeek,
  isSameDate,
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
  const [year, setYear] = useState(+date.format("jYYYY"));
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

  useEffect(() => {
    // base on date change change the days year and so on
    setDays(calculateDaysOrder(date));
    setMonth(+date.format("jMM"));
    setYear(+date.format("jYYYY"));
    setMonthName(convertFinglishMonthToPersian(date.format("jMMMM")));
  }, [date]);

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
    return days.map((row, rowIndex) => {
      const newRow: { [props: string]: JSX.Element } = {};

      weekDaysInPersianLetters.forEach((letter, columnIndex) => {
        const currentIndex = rowIndex * 7 + columnIndex;
        const isCurrentDay =
          year === currentYear &&
          month === currentMonth &&
          row[columnIndex] === currentDay &&
          currentIndex >= firstDayOfMonthInWeek &&
          currentIndex <= monthDaysCount + firstDayOfMonthInWeek;

        const isChosenDate =
          isSameDate(
            date,
            moment(`${year}/${month}/${row[columnIndex]}`, "jYYYY/jMM/jDD")
          ) &&
          currentIndex >= firstDayOfMonthInWeek &&
          currentIndex <= monthDaysCount + firstDayOfMonthInWeek;

        const backgroundColor = isCurrentDay
          ? `var(--blue)`
          : isChosenDate
          ? "var(--lighter-blue)"
          : undefined;

        return (newRow[letter] = (
          <HoverCircle
            width="30px"
            height="30px"
            className={`pointer`}
            backgroundColor={backgroundColor}
            hover={isCurrentDay ? false : isChosenDate ? false : true}
            background={isCurrentDay || isChosenDate}>
            <div
              style={{ color: isCurrentDay ? "white" : undefined }}
              onClick={() => {
                const changedMonth = whichMonth(currentIndex);
                // check if month is bigger than 12 or less or equal 0 change the year
                const changedYear =
                  changedMonth <= 0
                    ? year - 1
                    : changedMonth >= 13
                    ? year + 1
                    : year;

                // check if month is bigger than 12 return 1 or less than 0 return 12 else
                const month =
                  changedMonth <= 0
                    ? 12
                    : changedMonth >= 13
                    ? 1
                    : changedMonth;
                onDateClick(changedYear, month, row[columnIndex]);
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
    date,
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
        nextBtnDataTip="ماه بعد"
        previousBtnDataTip="ماه قبل"
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
