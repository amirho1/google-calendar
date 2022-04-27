import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { Api } from "../../hooks/useFetch";
import {
  ActionI,
  EventI,
  SAVE_ADDED_EVENT,
  SAVE_EVENTS,
} from "../reducers/events/events";

interface CreateEventProperties {
  body: EventI;
  calName: string;
  timeStamp: number;
}

export interface UpdateEventPayload {
  id: number;
  body: EventI;
}

export function* updateEvent(effect: Effect<string, UpdateEventPayload>) {}

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
  console.log();
  yield put({
    type: SAVE_ADDED_EVENT,
    payload: {
      event,
      timeStamp: effect.payload.timeStamp,
      calName: effect.payload.calName,
    },
  });
}

addEvent.type = "ADD_EVENT";

addEvent.ac = (props: CreateEventProperties) => {
  return { type: addEvent.type, payload: props };
};

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

export default function* watchAddingEvents() {
  yield takeEvery(addEvent.type, addEvent);
}

export function* watchGettingEvents() {
  yield takeEvery(getEvents.type, getEvents);
}
