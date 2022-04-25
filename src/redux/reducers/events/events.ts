import { Action } from "redux";
import { StatusT } from "../calendars";

export interface EventI {
  id?: 1;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
}

export interface Events {
  [date: string]: EventI[];
}

export interface EventsStateI {
  status: StatusT;
  events: Events;
}

const defaultValue: EventsStateI = {
  status: "idle",
  events: {},
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
  action: ActionI
) {
  switch (action.type) {
    case SAVE_EVENTS: {
      const timeStamp = (action as any).payload.timeStamp;
      const events = (action as any).payload.response;
      return events
        ? {
            ...state,
            events: { ...state.events, [timeStamp]: events },
          }
        : state;
    }
    case SAVE_ADDED_EVENT: {
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.timeStamp]: action.payload.event,
        },
      };
    }
    default:
      return state;
  }
}
