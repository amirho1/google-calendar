import { InitialValueI } from "../..";
import moment, { isMoment, Moment } from "moment-jalaali";
import { increaseDay, decreaseDay, setDate } from "./actions";
import { ActionI } from "../events/events";

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
  | "سه شنبه"
  | "چهارشنبه"
  | "پنجشنبه"
  | "جمعه";

export type EnglishMonthNames = "";

export interface DateI extends InitialValueI {
  date: Moment;
}

export const defaultValue: DateI = {
  date: moment().startOf("day"),
  status: "idle",
};

export default function dateReducer(
  state: DateI = defaultValue,
  action: ActionI<Moment>
) {
  switch (action.type) {
    case increaseDay.type: {
      const cloneDate = state.date.clone();
      cloneDate.add(1, "days").calendar();
      return { ...state, date: cloneDate };
    }
    case decreaseDay.type: {
      const cloneDate = state.date.clone();
      cloneDate.subtract(1, "days").calendar();
      return { ...state, date: cloneDate };
    }

    case setDate.type: {
      if (isMoment(action.payload)) return { ...state, date: action.payload };
      return state;
    }
    default:
      return state;
  }
}
