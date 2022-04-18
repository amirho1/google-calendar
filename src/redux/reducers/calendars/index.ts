import { Map } from "immutable";
import { Action } from "redux";
import { CalendarsI } from "../../sagas/calendars";

export const SAVE_CALENDARS = "SAVE_CALENDARS";

type StatusI = "idle" | "loading" | "success" | "error";

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
