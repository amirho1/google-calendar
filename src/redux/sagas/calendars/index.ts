import {
  call,
  delay,
  Effect,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { Api } from "../../../hooks/useFetch";
import {
  saveAddedCalendarAction,
  SAVE_CALENDARS,
  SAVE_DELETED_CALENDAR,
  SAVE_UPDATED_CALENDAR,
} from "../../reducers/calendars";
import {
  CLOSE_NOTIFICATION,
  OPEN_NOTIFICATION,
  SAVE_ADDED_NOTIFICATION,
} from "../../reducers/notifications/notifications";

export interface TaskI {
  dateFrom: string;
  dateTill: string;
  title: string;
  description: string;
}

export interface CalendarI {
  id?: number;
  description?: string;
  name: string;
  color: string;
  selected: boolean;
}

async function createCalendar(body: CalendarI) {
  const data = await Api({ method: "POST", url: "calendars", data: body });

  return data.data;
}

export function* addCalendar(effect: Effect<string, CalendarI>) {
  const newCalendar: CalendarI = yield call(createCalendar, effect.payload);
  yield put(saveAddedCalendarAction(newCalendar));
  yield put(SAVE_ADDED_NOTIFICATION({ message: "تقویم با موفقیت اضافی شد " }));
  yield put(OPEN_NOTIFICATION());
  yield delay(1000);
  yield put(CLOSE_NOTIFICATION());
}

addCalendar.ac = (newCalendar: CalendarI) => ({
  type: addCalendar.type,
  payload: newCalendar,
});
addCalendar.type = "ADD_CALENDAR";

export function* watchAddingCalendar() {
  yield takeEvery(addCalendar.type, addCalendar);
}

async function fetchCalenders() {
  const data = await Api({ method: "get", url: "/calendars" });
  return data.data;
}
export function* getCalendars() {
  const calendars: CalendarI[] = yield call(fetchCalenders);

  yield put({ type: SAVE_CALENDARS, payload: calendars });
}

getCalendars.type = "GET_CALENDARS";
getCalendars.ac = () => ({ type: getCalendars.type });

export default function* watchGettingCalenders() {
  yield takeLatest(getCalendars.type, getCalendars);
}

async function delCal(id: number) {
  Api({ method: "DELETE", url: `/calendars/${id}` });
}

export function* deleteCalendar(effect: Effect<string, number>) {
  yield call(delCal, effect.payload);
  yield put(SAVE_DELETED_CALENDAR(effect.payload));
  yield put(SAVE_ADDED_NOTIFICATION({ message: "تقویم با موفقیت حذف شد" }));
  yield put(OPEN_NOTIFICATION());
  yield delay(10000);
  yield put(CLOSE_NOTIFICATION());
}

deleteCalendar.type = "DELETE_CALENDAR";
deleteCalendar.ac = (id: number) => ({
  type: deleteCalendar.type,
  payload: id,
});

export function* watchDeletingCalendar() {
  yield takeLatest(deleteCalendar.type, deleteCalendar);
}

async function asyncUpdateCalendar(payload: CalendarI) {
  const updatedCal = await Api({
    method: "PUT",
    url: `/calendars/${payload.id}`,
    data: payload,
  });

  return updatedCal.data;
}

export function* updateCalendar({ payload }: Effect<string, CalendarI>) {
  yield call(asyncUpdateCalendar, payload);
  yield put(SAVE_UPDATED_CALENDAR(payload));
}

updateCalendar.type = "UPDATE_CALENDAR";
updateCalendar.ac = (updatedCal: CalendarI) => ({
  type: updateCalendar.type,
  payload: updatedCal,
});

export function* watchingUpdatingCalendars() {
  yield takeLatest(updateCalendar.type, updateCalendar);
}
