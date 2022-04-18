import { all } from "redux-saga/effects";
import watchGettingCalenders from "./calendars";

const sagas: any[] = [watchGettingCalenders()];

export default function* rootSaga() {
  yield all(sagas);
}
