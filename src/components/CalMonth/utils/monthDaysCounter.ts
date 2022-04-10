import memoizeOne from "memoize-one";

const monthDaysNumber = function (year: number, month: number) {
  let day = 28;
  let monthCopy = month;

  while (monthCopy === month) {
    const date = new Date(year, month, day + 1);
    monthCopy = date.getMonth();

    if (month === monthCopy) {
      day = date.getDate();
    }
  }

  return day;
};

export default memoizeOne(monthDaysNumber);
