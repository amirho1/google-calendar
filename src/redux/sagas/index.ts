import { all } from "redux-saga/effects";
import watchGettingCalenders, { watchAddingCalendar } from "./calendars";
import watchAddingEvents, { watchGettingEvents } from "./events";

const sagas: any[] = [
  watchGettingCalenders(),
  watchAddingCalendar(),
  watchAddingEvents(),
  watchGettingEvents(),
];

export default function* rootSaga() {
  yield all(sagas);
}
