import { Action } from "redux";
import { InitialValueI } from "../..";
import { Moment } from "moment-jalaali";
import { dateHelper } from "../../../utils/helpers";
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
  | "یکشنبه"
  | "دوشنبه"
  | "سهشنبه"
  | "چهارشنبه"
  | "پنجشنبه"
  | "جمعه";

export type EnglishMonthNames = "";

export interface DateI extends InitialValueI {
  date: Moment;
  day: number;
  month: number;
  monthName: string;
  year: number;
  weekday: string;
}

export const defaultValue = dateHelper();

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
