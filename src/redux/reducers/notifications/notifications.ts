import produce from "immer";
import { InitialValueI } from "../..";
import { ActionI } from "../events/events";

export interface NotificationStateI extends InitialValueI {
  notifications: NotificationI[];
  display: boolean;
}

const defaultValue: NotificationStateI = {
  status: "idle",
  notifications: [],
  display: false,
};

export interface NotificationI {
  message: string;
}

export const SAVE_ADDED_NOTIFICATION = (
  payload: NotificationI
): ActionI<NotificationI> => ({
  type: SAVE_ADDED_NOTIFICATION.type,
  payload,
});

SAVE_ADDED_NOTIFICATION.type = "SAVE_ADDED_NOTIFICATION";

export const CLOSE_NOTIFICATION = () => ({
  type: CLOSE_NOTIFICATION.type,
});

CLOSE_NOTIFICATION.type = "CHANGE_DISPLAY";

export const OPEN_NOTIFICATION = () => ({
  type: OPEN_NOTIFICATION.type,
});

OPEN_NOTIFICATION.type = "OPEN_NOTIFICATION";

const notificationsReducer = produce((draftState, action) => {
  switch (action.type) {
    case SAVE_ADDED_NOTIFICATION.type: {
      draftState.notifications.push(action.payload);
      break;
    }
    case CLOSE_NOTIFICATION.type: {
      draftState.display = false;
      break;
    }
    case OPEN_NOTIFICATION.type: {
      draftState.display = true;
      break;
    }
    default:
      return draftState;
  }
}, defaultValue);

export default notificationsReducer;
