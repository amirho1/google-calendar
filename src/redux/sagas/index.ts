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
import watchDeletingImage, {
  watchGettingImage,
  watchGettingUser,
  watchUploadingImage,
} from "./user";

const sagas: any[] = [
  watchingDeletingEvent(),
  watchGettingCalenders(),
  watchAddingCalendar(),
  watchAddingEvents(),
  watchGettingEvents(),
  watchDeletingCalendar(),
  watchingUpdatingCalendars(),
  watchingUpdatingEvent(),
  watchGettingUser(),
  watchUploadingImage(),
  watchGettingImage(),
  watchDeletingImage(),
];

export default function* rootSaga() {
  yield all(sagas);
}
