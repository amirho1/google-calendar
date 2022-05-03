import produce from "immer";
import { Action } from "redux";
import { CalendarsI } from "../../sagas/calendars";

export const SAVE_CALENDARS = "SAVE_CALENDARS";
export const SAVE_DELETED_CALENDAR = (payload: number) => ({
  type: SAVE_DELETED_CALENDAR,
  payload,
});

SAVE_DELETED_CALENDAR.type = "SAVE_DELETED_CALENDAR";

export type StatusT = "idle" | "loading" | "success" | "error";

export const saveAddedCalendarAction = function (newCalendar: CalendarsI) {
  return { type: saveAddedCalendarAction.type, payload: newCalendar };
};
saveAddedCalendarAction.type = "SAVE_ADDED_CALENDER";

export interface CalendarsStateI {
  status: StatusT;
  calendars: CalendarsI[];
}

const defaultValue: CalendarsStateI = {
  status: "idle",
  calendars: [],
};

interface ActionI<PayloadT> extends Action {
  payload: PayloadT;
}

const calendarsReducer = produce(
  (draftState, { type, payload }: ActionI<any>) => {
    switch (type) {
      case SAVE_CALENDARS: {
        draftState.calendars = payload;
        break;
      }
      case SAVE_DELETED_CALENDAR: {
        draftState.calendars = draftState.calendars.filter(
          cal => cal.id !== payload
        );
        break;
      }
      default:
        return draftState;
    }
  },
  defaultValue
);

export default calendarsReducer;
