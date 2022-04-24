import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { Api } from "../../hooks/useFetch";
import {
  ActionI,
  EventI,
  SAVE_ADDED_EVENT,
  SAVE_EVENTS,
} from "../reducers/events/events";

async function createEvent(body: EventI) {
  const res = await Api({
    method: "POST",
    url: "/events/tasks/1670963400000",
    data: body,
  });
  return res.data;
}

export function* addEvent(effect: Effect<string, EventI>) {
  const response: EventI = yield call(createEvent, effect.payload);
  yield put({ type: SAVE_ADDED_EVENT, payload: response });
}

addEvent.type = "ADD_EVENT";

addEvent.ac = (body: EventI) => {
  return { type: addEvent.type, payload: body };
};

interface FetchEventsProps {
  timeStamp: string;
}

async function fetchEvents({ timeStamp }: FetchEventsProps) {
  if (!timeStamp)
    return console.error(`${fetchEvents.name} should get a timeStamp`);

  const res = await Api({ method: "GET", url: `/events/tasks/${timeStamp}` });
  return res.data;
}

export function* getEvents(effect: Effect<string, FetchEventsProps>) {
  const response: EventI[] = yield call(fetchEvents, effect.payload);
  yield put({
    type: SAVE_EVENTS,
    payload: { response, timeStamp: effect.payload.timeStamp },
  });
}

getEvents.type = "GET_EVENTS";
getEvents.ac = (payload: FetchEventsProps): ActionI => ({
  payload,
  type: getEvents.type,
});

export default function* watchAddingEvents() {
  yield takeEvery(addEvent.type, addEvent);
}

export function* watchGettingEvents() {
  yield takeEvery(getEvents.type, getEvents);
}
