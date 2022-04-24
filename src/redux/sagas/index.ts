import { all } from "redux-saga/effects";
import watchGettingCalenders, { watchAddingCalendar } from "./calendars";
import watchAddingEvents from "./events";

const sagas: any[] = [
  watchGettingCalenders(),
  watchAddingCalendar(),
  watchAddingEvents(),
];

export default function* rootSaga() {
  yield all(sagas);
}
