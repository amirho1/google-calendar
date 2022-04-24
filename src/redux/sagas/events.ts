import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { Api } from "../../hooks/useFetch";
import { EventI, SAVE_ADDED_EVENT } from "../reducers/events/events";

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

export default function* watchAddingEvents() {
  yield takeEvery(addEvent.type, addEvent);
}
