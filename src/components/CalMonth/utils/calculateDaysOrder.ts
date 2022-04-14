/* eslint-disable no-loop-func */
import { Console } from "console";
import memoizeOne from "memoize-one";
import moment, { Moment } from "moment-jalaali";
import {
  jYYYY_jMM_jDD,
  weekDaysEnglishToPersianLetters,
  weekDaysInPersianLetters,
} from "../../../utils/helpers";

const calculateDaysOrder = function (date: Moment) {
  const year = +date.format("jYYYY");
  const month = +date.format("jMM");
  let day = 1;
  let nextMonthDay = 1;
  const arr: number[][] = [];
  const monthDaysCount = moment.jDaysInMonth(year, month - 1);

  const monthFirstDayWeekDayName = (weekDaysEnglishToPersianLetters as any)[
    moment(`${year}/${month}/1`, jYYYY_jMM_jDD).format("dddd").toLowerCase()
  ];

  const monthFirstDayWeekDayNameIndex = weekDaysInPersianLetters.findIndex(
    letter => letter === monthFirstDayWeekDayName
  );

  const { year: previousYear, month: previousMonth } =
    month - 1 !== 0
      ? { year, month: month - 1 }
      : { year: year - 1, month: 11 };

  let previousMonthDayCount =
    moment.jDaysInMonth(previousYear, previousMonth) -
    monthFirstDayWeekDayNameIndex +
    1;

  let index = 0;
  for (let i = 0; i < 6; i++) {
    const row: number[] = [];
    weekDaysInPersianLetters.forEach(letter => {
      if (monthFirstDayWeekDayNameIndex > index) {
        row.push(previousMonthDayCount);
        ++index;
        ++previousMonthDayCount;
      } else if (monthDaysCount < day) {
        row.push(nextMonthDay);
        ++index;
        ++nextMonthDay;
      } else {
        row.push(day);

        ++index;
        ++day;
      }
    });
    arr.push(row);
  }

  return arr;
};

export default memoizeOne(calculateDaysOrder);
