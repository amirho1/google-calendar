import { Moment } from "moment-jalaali";

export function increaseDay() {
  return { type: increaseDay.type };
}

increaseDay.type = "INCREASE_DAY";

export function decreaseDay() {
  return { type: decreaseDay.type };
}

export function setDate(payload: Moment) {
  return { type: setDate.type, payload };
}

setDate.type = "SET_DATE";

decreaseDay.type = "DECREASE_DAY";
