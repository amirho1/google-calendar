import { all } from "redux-saga/effects";
import watchGettingCalenders, {
  watchAddingCalendar,
  watchDeletingCalendar,
  watchingUpdatingCalendars,
} from "./calendars";
import watchAddingEvents, {
  watchGettingEvents,
  watchingDeletingEvent,
  watchingUpdatingEvent,
} from "./events";

const sagas: any[] = [
  watchingDeletingEvent(),
  watchGettingCalenders(),
  watchAddingCalendar(),
  watchAddingEvents(),
  watchGettingEvents(),
  watchDeletingCalendar(),
  watchingUpdatingCalendars(),
  watchingUpdatingEvent(),
];

export default function* rootSaga() {
  yield all(sagas);
}
