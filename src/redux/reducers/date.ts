import { Action } from "redux";
import { InitialValueI } from "..";

export type PersianMonthNameT =
  | "فروردین"
  | "اردیبهشت"
  | "خرداد"
  | "تیر"
  | "مرداد"
  | "شهریور"
  | "مهر"
  | "آبان"
  | "آذر"
  | "دی"
  | "بهمن"
  | "اسفند";

export type PersianWeekDaysNameT =
  | "شنبه"
  | "یک شنبه"
  | "دو شنبه"
  | "سه شنبه"
  | "چهار شنبه"
  | "پنج شنبه"
  | "جمعه";

export type EnglishMonthNames = "";

export interface DateI extends InitialValueI {
  currentDate: Date;
  date: Date;
  day: number;
  month: number;
  monthName: string;
  year: number;
  weekday: string;
}

const defaultValue = ((): DateI => {
  const date = new Date();

  const year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate() + 1;

  const weekday = date.toLocaleDateString("fa-ir", { weekday: "long" });

  const monthName = new Intl.DateTimeFormat("fa", {
    month: "long",
  }).format(date);

  return {
    status: "idle",
    currentDate: date,
    day,

    year,
    date,
    month,

    monthName,
    weekday,
  };
})();

export default function dateReducer(
  state: DateI = defaultValue,
  action: Action
) {
  switch (action.type) {
    default:
      return state;
  }
}
