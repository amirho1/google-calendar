import moment, { Moment } from "moment-jalaali";

export interface CatchI<T = any> {
  [prop: string]: T;
}

export interface ConvertPersianNumToEnglishI {
  cache: CatchI<number>;
  (persianNumber: string): number;
}

export const convertPersianNumToEnglish: ConvertPersianNumToEnglishI =
  function (persianNumber: string) {
    if (convertPersianNumToEnglish.cache[persianNumber]) {
      return convertPersianNumToEnglish.cache[persianNumber];
    }
    const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";

    let english: string = "";

    persianNumber.split("").forEach(num => {
      if (persianNumbers.includes(num)) {
        english += persianNumbers.split("").findIndex(perNum => num === perNum);
      }
    });

    convertPersianNumToEnglish.cache[persianNumber] = +english;

    return +english;
  };

convertPersianNumToEnglish.cache = {};

export function convertMonthNumberToName(num: number, monthsName: string[]) {
  return monthsName[num - 1];
}

type WeekDaysInPersianLettersT = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
export const weekDaysInPersianLetters: WeekDaysInPersianLettersT = [
  "ش",
  "ی",
  "د",
  "س",
  "چ",
  "پ",
  "ج",
];

export const weekDaysEnglishToPersianLetters = {
  saturday: "ش",
  sunday: "ی",
  monday: "د",
  tuesday: "س",
  wednesday: "چ",
  thursday: "پ",
  friday: "ج",
};

export type WeekDaysInPersianWordT = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه"
];

export const weekDaysInPersianWord: WeekDaysInPersianWordT = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export const weekdaysEnglishToPersian = {
  saturday: "شنبه",
  sunday: "یکشنبه",
  monday: "دوشنبه",
  wednesday: "چهارشنبه",
  tuesday: "سه شنبه",
  thursday: "پنجشنبه",
  friday: "جمعه",
};

export type EnglishWeekDaysNameT =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type PersianMonthsNameT = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
];

export const persianMonthsName: PersianMonthsNameT = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const finglishMonthsNameToPersian: { [props: string]: string } = {
  farvardin: "فروردین",
  ordibehesht: "اردیبهشت",
  khordaad: "خرداد",
  tir: "تیر",
  amordaad: "مرداد",
  shahrivar: "شهریور",
  mehr: "مهر",
  aabaan: "آبان",
  aazar: "آذر",
  dey: "دی",
  bahman: "بهمن",
  esfand: "اسفند",
};

export const convertFinglishMonthToPersian = (finglishName: string) => {
  return finglishMonthsNameToPersian[finglishName.toLowerCase()];
};

export function arrayOfNumbers(num: number) {
  const arr: number[] = [];
  for (let i = 0; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}

export const convertEnglishWeekdaysToPersian = (
  weekDay: EnglishWeekDaysNameT
) => {
  return weekdaysEnglishToPersian[weekDay];
};

export const jYYYY_jMM_jDD = "jYYYY/jMM/jDD";

export const capitalize = (text: string) => {
  if (text) return `${text[0].toUpperCase()}${text.slice(1)}`;
  return text;
};

export const convertHoursToMinutes = (date: moment.Moment) => {
  return moment.duration(date.format("HH:mm:ss")).asMinutes();
};

export function dateHelper() {
  const date = moment();

  const year = +date.format("jYYYY"),
    month = +date.format("jMM"),
    day = +date.format("jDD");

  const weekday = date.format("dddd");
  const monthName = convertFinglishMonthToPersian(date.format("jMMMM"));

  return {
    status: "idle",
    date,

    day,
    year,
    month,

    monthName,
    weekday,
  };
}

export function addOrSubtractSpecificAmount(
  current: number,
  newNum: number,
  amount: number
) {
  const halfAmount = amount / 2;
  const subtractOrAdd = newNum > current;

  //add
  if (subtractOrAdd) {
    const positive = newNum - current;
    const leftOver = positive % amount;

    const divide =
      leftOver >= halfAmount
        ? Math.ceil(positive / amount)
        : Math.floor(positive / amount);
    return current + amount * divide;
  } else {
    const negative = current - newNum;
    const leftOver = negative % amount;
    const divide =
      leftOver >= halfAmount
        ? Math.ceil(negative / amount)
        : Math.floor(negative / amount);
    return current - amount * divide;
  }
}

export function roundSpecific(number: number, base: number) {
  const halfBase = base / 2;
  const leftOver = number % base;
  if (halfBase > leftOver) {
    const divided = Math.floor(number / base);
    return base * divided;
  } else {
    const divided = Math.ceil(number / base);
    return base * divided;
  }
}

export function indexOfFirstDayOfMonthInWeek(date: Moment) {
  const monthFirstDayWeekDayName = (weekDaysEnglishToPersianLetters as any)[
    date.format("dddd").toLowerCase()
  ];

  const monthFirstDayWeekDayNameIndex = weekDaysInPersianLetters.findIndex(
    letter => letter === monthFirstDayWeekDayName
  );

  return monthFirstDayWeekDayNameIndex;
}

export function convertAMPMtoPersia(hour: string) {
  return hour.split(" ")[1] === "AM"
    ? hour.replace("AM", "قب")
    : hour.replace("PM", "بع");
}

export function convertMinutesToHours(minutes: number) {
  return moment().startOf("day").add(minutes, "minutes").format("hh:mm A");
}

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const isSameDate = (date: Moment, secondDate: Moment) => {
  return secondDate.format("YYYY/MM/DD") === date.format("YYYY/MM/DD");
};

export const preventDefault: React.FormEventHandler<HTMLDivElement> = e => {
  e.preventDefault();
};
