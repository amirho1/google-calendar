import { all } from "redux-saga/effects";
import watchGettingCalenders, { watchAddingCalendar } from "./calendars";

const sagas: any[] = [watchGettingCalenders(), watchAddingCalendar()];

export default function* rootSaga() {
  yield all(sagas);
}
