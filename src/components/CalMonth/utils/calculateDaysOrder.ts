/* eslint-disable no-loop-func */
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
  let previousDay = date.daysInMonth() - monthFirstDayWeekDayNameIndex;
  let index = 0;

  for (let i = 0; i < 6; i++) {
    const row: number[] = [];
    weekDaysInPersianLetters.forEach(letter => {
      if (monthFirstDayWeekDayNameIndex > index) {
        row.push(previousDay);
        ++index;
        ++previousDay;
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
