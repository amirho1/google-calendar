import produce from "immer";
import { Action } from "redux";
import { CalendarI } from "../../sagas/calendars";

export const SAVE_CALENDARS = "SAVE_CALENDARS";
export const SAVE_DELETED_CALENDAR = (payload: number) => ({
  type: SAVE_DELETED_CALENDAR.type,
  payload,
});

SAVE_DELETED_CALENDAR.type = "SAVE_DELETED_CALENDAR";

export type StatusT = "idle" | "loading" | "success" | "error";

export const saveAddedCalendarAction = function (newCalendar: CalendarI) {
  return { type: saveAddedCalendarAction.type, payload: newCalendar };
};
saveAddedCalendarAction.type = "SAVE_ADDED_CALENDER";

export interface CalendarsStateI {
  status: StatusT;
  calendars: CalendarI[];
}

const defaultValue: CalendarsStateI = {
  status: "idle",
  calendars: [],
};

interface ActionI<PayloadT> extends Action {
  payload: PayloadT;
}

export const SAVE_UPDATED_CALENDAR = (payload: CalendarI) => ({
  type: SAVE_UPDATED_CALENDAR.type,
  payload: payload,
});

SAVE_UPDATED_CALENDAR.type = "SAVE_UPDATED_CALENDAR";

const calendarsReducer = produce(
  (draftState, { type, payload }: ActionI<any>) => {
    switch (type) {
      case SAVE_CALENDARS: {
        draftState.calendars = payload;
        break;
      }
      case SAVE_DELETED_CALENDAR.type: {
        console.log("here");
        draftState.calendars = draftState.calendars.filter(
          cal => cal.id !== payload
        );
        break;
      }
      case SAVE_UPDATED_CALENDAR.type: {
        draftState.calendars = draftState.calendars.map(cal =>
          cal.id === payload.id ? payload : cal
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
