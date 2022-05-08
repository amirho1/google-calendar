import { Action } from "redux";
import { SAVE_UPDATED_CALENDAR, StatusT } from "../calendars";
import produce from "immer";

export interface EventI {
  id?: 1;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
  color: string;
  calId: number;
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
export const SAVE_DELETED_EVENT = "SAVE_DELETED_EVENT";

interface SAVE_UPDATED_EVENTPropsI {
  calName: string;
  timeStamp: number;
  event: EventI;
}

export const SAVE_UPDATED_EVENT = (payload: SAVE_UPDATED_EVENTPropsI) => ({
  type: SAVE_UPDATED_EVENT.type,
  payload,
});

SAVE_UPDATED_EVENT.type = "SAVE_UPDATE_EVENT";

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
        const events: EventI[] = action.payload.response || [];
        if (!draftState.events[calName]) {
          draftState.events[calName] = {};
          draftState.events[calName][timeStamp] = events;
          break;
        }

        draftState.events[calName][timeStamp] = events;
        break;
      }

      case SAVE_ADDED_EVENT: {
        if (!draftState.events[calName]) {
          draftState.events[calName] = {};
          draftState.events[calName][timeStamp] = [action.payload.event];
          break;
        } else if (!draftState.events[calName][timeStamp]) {
          draftState.events[calName][timeStamp] = [action.payload.event];
          break;
        }
        draftState.events[calName][timeStamp].push(action.payload.event);
        break;
      }

      case SAVE_DELETED_EVENT: {
        draftState.events[calName][timeStamp] = draftState.events[calName][
          timeStamp
        ].filter(event => event.id !== action.payload.id);
        break;
      }
      case SAVE_UPDATED_EVENT.type: {
        draftState.events[calName][timeStamp] = draftState.events[calName][
          timeStamp
        ].map(event => {
          if (event.id === action.payload.event.id) {
            return action.payload.event;
          }
          return event;
        });
        break;
      }

      default:
        return draftState;
    }
  }
);
export default eventsReducer;
