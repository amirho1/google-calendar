/* eslint-disable no-fallthrough */
import { Action } from "redux";
import { StatusT } from "../calendars";
import produce from "immer";
import { AiOutlineConsoleSql } from "react-icons/ai";
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
export const SAVE_DELETE_EVENT = "DELETE_EVENT";
export const SAVE_UPDATE_EVENT = "UPDATE_EVENT";

export const eventsActionCreator = (type: string, payload: any) => ({
  type,
  payload,
});

export interface ActionI<PayloadT = any> extends Action {
  payload: PayloadT;
}

const eventsReducer = produce(
  (draftState: EventsStateI = defaultValue, action: ActionI) => {
    const timeStamp: string = action?.payload?.timeStamp;
    const calName: string = action?.payload?.calName;

    switch (action.type) {
      case SAVE_EVENTS: {
        const events: EventI[] = action.payload.response;

        if (!draftState.events[calName]) {
          draftState.events[calName] = {};
          draftState.events[calName][timeStamp] = events;
          return;
        }
        draftState.events[calName][timeStamp] = events;
      }

      case SAVE_ADDED_EVENT: {
        if (!draftState.events[calName]) {
          draftState.events[calName] = {};
          draftState.events[calName][timeStamp] = [action.payload.event];
          return;
        }
        draftState.events[calName][timeStamp].push(action.payload.event);
      }

      case SAVE_DELETE_EVENT: {
      }
      case SAVE_UPDATE_EVENT: {
      }
      default:
        return draftState;
    }
  }
);
export default eventsReducer;
