import { Action } from "redux";
import { InitialValueI } from "../..";
import moment, { Moment } from "moment-jalaali";
import { convertFinglishMonthToPersian } from "../../../utils/helpers";
import { dateIncreaseMonth } from "./actions";
import { Map } from "immutable";

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
  currentDate: moment.Moment;
  date: Moment;
  day: number;
  month: number;
  monthName: string;
  year: number;
  weekday: string;
}

export const defaultValue = ((): DateI => {
  const date = moment();

  const year = +date.format("jYYYY"),
    month = +date.format("jMM"),
    day = +date.format("jDD");

  const weekday = date.format("dddd");
  const monthName = convertFinglishMonthToPersian(date.format("jMMMM"));

  return {
    status: "idle",
    currentDate: date,
    date,

    day,
    year,
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
    case dateIncreaseMonth.type: {
      let imuCopy = Map(state);
      imuCopy = imuCopy.set("month", state.month + 1);
      return imuCopy.toJS();
    }
    default:
      return state;
  }
}
