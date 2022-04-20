import { Map } from "immutable";
import { Action } from "redux";
import { CalendarsI } from "../../sagas/calendars";

export const SAVE_CALENDARS = "SAVE_CALENDARS";

type StatusI = "idle" | "loading" | "success" | "error";

export const saveAddedCalendarAction = function (newCalendar: CalendarsI) {
  return { type: saveAddedCalendarAction.type, payload: newCalendar };
};
saveAddedCalendarAction.type = "SAVE_ADDED_CALENDER";

export interface CalendarsStateI {
  status: StatusI;
  calendars: CalendarsI[];
}

const defaultValue: CalendarsStateI = {
  status: "idle",
  calendars: [],
};

interface ActionI<PayloadT> extends Action {
  payload: PayloadT;
}

export default function calendarsReducer(
  state: CalendarsStateI = defaultValue,
  { type, payload }: ActionI<any>
) {
  switch (type) {
    case SAVE_CALENDARS: {
      let imuCopy = Map(state);
      imuCopy = imuCopy.set("status", "success");
      imuCopy = imuCopy.set("calendars", payload);
      return imuCopy.toJS();
    }
    default:
      return state;
  }
}
