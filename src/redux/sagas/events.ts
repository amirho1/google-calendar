import { call, delay, Effect, put, takeEvery } from "redux-saga/effects";
import { Api } from "../../hooks/useFetch";
import {
  ActionI,
  EventI,
  SAVE_ADDED_EVENT,
  SAVE_EVENTS,
} from "../reducers/events/events";
import { SAVE_DELETED_EVENT } from "../reducers/events/events";
import {
  CLOSE_NOTIFICATION,
  OPEN_NOTIFICATION,
  SAVE_ADDED_NOTIFICATION,
} from "../reducers/notifications/notifications";

interface CreateEventProperties {
  body: EventI;
  calName: string;
  timeStamp: number;
}

export interface UpdateEventPayload {
  id: number;
  body: EventI;
  timeStamp: number;
  calName: string;
}

async function asyncUpdateEven({
  body,
  id,
  calName,
  timeStamp,
}: UpdateEventPayload) {
  const res = await Api({
    method: "put",
    data: body,
    url: `/events/${calName}/${timeStamp}/${id}`,
  });
  return res.data;
}

export function* updateEvent(effect: Effect<string, UpdateEventPayload>) {
  const res: EventI = yield call(asyncUpdateEven, effect.payload);
}

updateEvent.type = "UPDATE_EVENT";
updateEvent.ac = (payload: UpdateEventPayload) => ({
  type: updateEvent.type,
  payload,
});

export function* watchingUpdatingEvent() {
  yield takeEvery(updateEvent.type, updateEvent);
}

async function createEvent({
  body,
  timeStamp,
  calName,
}: CreateEventProperties) {
  const res = await Api({
    method: "POST",
    url: `/events/${calName}/${timeStamp}`,
    data: body,
  });
  return res.data;
}

export function* addEvent(effect: Effect<string, CreateEventProperties>) {
  const event: EventI = yield call(createEvent, effect.payload);
  yield put({
    type: SAVE_ADDED_EVENT,
    payload: {
      event,
      timeStamp: effect.payload.timeStamp,
      calName: effect.payload.calName,
    },
  });

  yield put(SAVE_ADDED_NOTIFICATION({ message: "رویداد با موفقیت ذخیره شد" }));
  yield put(OPEN_NOTIFICATION());
  yield delay(10000);
  yield put(CLOSE_NOTIFICATION());
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
  calName: string;
}

async function fetchEvents({ timeStamp, calName }: FetchEventsProps) {
  if (!timeStamp)
    return console.error(`${fetchEvents.name} should get a timeStamp`);

  const res = await Api({
    method: "GET",
    url: `/events/${calName}/${timeStamp}`,
  });
  return res.data;
}

export function* getEvents(effect: Effect<string, FetchEventsProps>) {
  const response: EventI[] = yield call(fetchEvents, effect.payload);
  yield put({
    type: SAVE_EVENTS,
    payload: {
      response,
      timeStamp: effect.payload.timeStamp,
      calName: effect.payload.calName,
    },
  });
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
  calName: string;
  timeStamp: number;
  id: number;
}

async function removeEvent({ calName, timeStamp, id }: RemoveEventsProps) {
  const res = await Api({
    method: "DELETE",
    url: `/events/${calName}/${timeStamp}/${id}`,
  });
  return res.data;
}

export function* deleteEvent(effect: Effect<string, RemoveEventsProps>) {
  yield call(removeEvent, effect.payload);
  yield put({ type: SAVE_DELETED_EVENT, payload: effect.payload });
  yield put(SAVE_ADDED_NOTIFICATION({ message: "رویداد با موفقیت حذف شد" }));
  yield put(OPEN_NOTIFICATION());
  yield delay(10000);
  yield put(CLOSE_NOTIFICATION());
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
