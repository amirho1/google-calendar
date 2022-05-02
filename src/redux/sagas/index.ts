import { all } from "redux-saga/effects";
import watchGettingCalenders, { watchAddingCalendar } from "./calendars";
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
];

export default function* rootSaga() {
  yield all(sagas);
}
