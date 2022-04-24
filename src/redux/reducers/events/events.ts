import { Action } from "redux";
import { Map } from "immutable";
import { StatusT } from "../calendars";

export interface EventI {
  id?: 1;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
}

interface EventsStateI {
  status: StatusT;
  events: EventI[];
}

const defaultValue: EventsStateI = {
  status: "idle",
  events: [],
};

export const SAVE_ADDED_EVENT = "SAVE_ADDED_EVENT";
export const SAVE_EVENTS = "SAVE_EVENTS";

export const eventsActionCreator = (type: string, payload: any) => ({
  type,
  payload,
});

export interface ActionI<PayloadT = any> extends Action {
  payload: PayloadT;
}

export default function eventsReducer(
  state: EventsStateI = defaultValue,
  action: ActionI<EventI>
) {
  switch (action.type) {
    case SAVE_ADDED_EVENT: {
      let stateClone = Map(state);
      stateClone = stateClone.set("status", "success");
      stateClone = stateClone.updateIn(["events"], (value: EventI[]) => [
        ...value,
        action.payload,
      ]);

      return stateClone.toJS();
    }
    default:
      return state;
  }
}
