import {
  call,
  delay,
  Effect,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { Api } from "../../hooks/useFetch";
import {
  ActionI,
  EventI,
  SAVE_ADDED_EVENT,
  SAVE_EVENTS,
  SAVE_UPDATED_EVENT,
} from "../reducers/events/events";
import { SAVE_DELETED_EVENT } from "../reducers/events/events";
import {
  CLOSE_NOTIFICATION,
  OPEN_NOTIFICATION,
  SAVE_ADDED_NOTIFICATION,
} from "../reducers/notifications/notifications";

interface CreateEventProperties {
  body: EventI;
  calId: string;
  timeStamp: number;
}

export interface UpdateEventPayload {
  id: string;
  body: EventI;
  timeStamp: number;
  calId: string;
}

async function asyncUpdateEven({ body, id }: UpdateEventPayload) {
  const res = await Api({
    method: "put",
    data: body,
    url: `/events/${id}`,
  });
  return res.data;
}

export function* updateEvent(effect: Effect<string, UpdateEventPayload>) {
  try {
    const res: EventI = yield call(asyncUpdateEven, effect.payload);
    yield put(
      SAVE_UPDATED_EVENT({
        event: res,
        calId: effect.payload.calId,
        timeStamp: effect.payload.timeStamp,
      })
    );

    yield notificationCaller("رویداد با موفقیت ذخیره شد");
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
}

updateEvent.type = "UPDATE_EVENT";
updateEvent.ac = (payload: UpdateEventPayload) => ({
  type: updateEvent.type,
  payload,
});

export function* watchingUpdatingEvent() {
  yield takeLatest(updateEvent.type, updateEvent);
}

async function createEvent({ body }: CreateEventProperties) {
  const res = await Api({
    method: "POST",
    url: decodeURIComponent(`/events`),
    data: body,
  });

  return res.data;
}

export function* addEvent(effect: Effect<string, CreateEventProperties>) {
  try {
    const event: EventI = yield call(createEvent, effect.payload);
    yield put({
      type: SAVE_ADDED_EVENT,
      payload: {
        event,
        timeStamp: effect.payload.timeStamp,
        calId: effect.payload.calId,
      },
    });

    yield notificationCaller("رویداد با موفقیت ذخیره شد");
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
}

addEvent.type = "ADD_EVENT";

addEvent.ac = (props: CreateEventProperties) => {
  return { type: addEvent.type, payload: props };
};
export default function* watchAddingEvents() {
  yield takeEvery(addEvent.type, addEvent);
}

interface FetchEventsProps {
  timeStamp: string;
  calId: string;
}

async function fetchEvents({ timeStamp, calId }: FetchEventsProps) {
  if (!timeStamp)
    return console.error(`${fetchEvents.name} should get a timeStamp`);

  const res = await Api({
    method: "GET",
    url: `/events/${calId}/${timeStamp}`,
  });

  return res.data;
}

export function* notificationCaller(message: string) {
  yield put(SAVE_ADDED_NOTIFICATION({ message: message }));
  yield put(OPEN_NOTIFICATION());
  yield delay(10000);
  yield put(CLOSE_NOTIFICATION());
}

export function* getEvents(effect: Effect<string, FetchEventsProps>) {
  try {
    const response: EventI[] = yield call(fetchEvents, effect.payload);
    yield put({
      type: SAVE_EVENTS,
      payload: {
        response,
        timeStamp: effect.payload.timeStamp,
        calId: effect.payload.calId,
      },
    });
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
}

getEvents.type = "GET_EVENTS";

getEvents.ac = (payload: FetchEventsProps): ActionI => ({
  payload,
  type: getEvents.type,
});

export function* watchGettingEvents() {
  yield takeEvery(getEvents.type, getEvents);
}

interface RemoveEventsProps {
  calId: string;
  timeStamp: number;
  id: string;
}

async function removeEvent({ id }: RemoveEventsProps) {
  const res = await Api({
    method: "DELETE",
    url: `/events/${id}`,
  });
  return res.data;
}

export function* deleteEvent(effect: Effect<string, RemoveEventsProps>) {
  try {
    yield call(removeEvent, effect.payload);
    yield put({ type: SAVE_DELETED_EVENT, payload: effect.payload });
    yield notificationCaller("رویداد با موفقیت حذف شد");
  } catch (err: any) {
    yield notificationCaller(err);
  }
}

deleteEvent.type = "DELETE_EVENT";
deleteEvent.ac = (payload: RemoveEventsProps) => {
  return {
    type: deleteEvent.type,
    payload,
  };
};

export function* watchingDeletingEvent() {
  yield takeEvery(deleteEvent.type, deleteEvent);
}
