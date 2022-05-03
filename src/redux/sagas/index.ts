import { all } from "redux-saga/effects";
import watchGettingCalenders, {
  watchAddingCalendar,
  watchDeletingCalendar,
} from "./calendars";
import watchAddingEvents, {
  watchGettingEvents,
  watchingDeletingEvent,
} from "./events";

const sagas: any[] = [
  watchingDeletingEvent(),
  watchGettingCalenders(),
  watchAddingCalendar(),
  watchAddingEvents(),
  watchGettingEvents(),
  watchDeletingCalendar(),
];

export default function* rootSaga() {
  yield all(sagas);
}
