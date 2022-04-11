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
  "یک شنبه",
  "دو شنبه",
  "سه شنبه",
  "چهار شنبه",
  "پنج شنبه",
  "جمعه"
];

export const weekDaysInPersianWord: WeekDaysInPersianWordT = [
  "شنبه",
  "یک شنبه",
  "دو شنبه",
  "سه شنبه",
  "چهار شنبه",
  "پنج شنبه",
  "جمعه",
];

export const weekdaysEnglishToPersian = {
  saturday: "شنبه",
  sunday: "یک شنبه",
  monday: "دو شنبه",
  wednesday: "چهار شنبه",
  tuesday: "سه شنبه",
  thursday: "پنج شنبه",
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
