import { Action } from "redux";
import { StatusT } from "../calendars";
import produce from "immer";
export interface EventI {
  id?: 1;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
  color: string;
}

export interface Events {
  [taskName: string]: { [date: string]: EventI[] };
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
export const DELETE_EVENT = "DELETE_EVENT";

export const eventsActionCreator = (type: string, payload: any) => ({
  type,
  payload,
});

export interface ActionI<PayloadT = any> extends Action {
  payload: PayloadT;
}

const eventsReducer = produce(
  (draftState: EventsStateI = defaultValue, action: ActionI) => {
    switch (action.type) {
      case SAVE_EVENTS: {
        const timeStamp: string = action.payload.timeStamp;
        const events: EventI[] = action.payload.response;
        const task: string = action.payload.task;

        return (draftState.events[task][timeStamp] = events);
      }
      case SAVE_ADDED_EVENT: {
        return {
          ...draftState,
          events: {
            ...draftState.events,
            [action.payload.timeStamp]: action.payload.event,
          },
        };
      }
      default:
        return draftState;
    }
  }
);
export default eventsReducer;
