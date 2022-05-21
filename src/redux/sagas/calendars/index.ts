import { call, Effect, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../../../hooks/useFetch";
import {
  saveAddedCalendarAction,
  SAVE_CALENDARS,
  SAVE_DELETED_CALENDAR,
  SAVE_UPDATED_CALENDAR,
} from "../../reducers/calendars";
import { notificationCaller } from "../events";

export interface TaskI {
  dateFrom: string;
  dateTill: string;
  title: string;
  description: string;
}

export interface CalendarI {
  _id?: string;
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
  try {
    const newCalendar: CalendarI = yield call(createCalendar, effect.payload);
    yield put(saveAddedCalendarAction(newCalendar));
    yield notificationCaller("تقویم با موفقیت اضافی شد ");
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
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
  try {
    yield call(delCal, effect.payload);
    yield put(SAVE_DELETED_CALENDAR(effect.payload));
    yield notificationCaller("تقویم با موفقیت حذف شد");
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
}

deleteCalendar.type = "DELETE_CALENDAR";
deleteCalendar.ac = (id: string) => ({
  type: deleteCalendar.type,
  payload: id,
});

export function* watchDeletingCalendar() {
  yield takeLatest(deleteCalendar.type, deleteCalendar);
}

async function asyncUpdateCalendar(payload: CalendarI) {
  const updatedCal = await Api({
    method: "PUT",
    url: `/calendars/${payload._id}`,
    data: payload,
  });

  return updatedCal.data;
}

export function* updateCalendar({ payload }: Effect<string, CalendarI>) {
  try {
    yield call(asyncUpdateCalendar, payload);
    yield put(SAVE_UPDATED_CALENDAR(payload));
    yield notificationCaller("تقویم با موفقیت ذخیره شد.");
  } catch (err: any) {
    yield notificationCaller(err.message);
  }
}

updateCalendar.type = "UPDATE_CALENDAR";
updateCalendar.ac = (updatedCal: CalendarI) => {
  return {
    type: updateCalendar.type,
    payload: updatedCal,
  };
};

export function* watchingUpdatingCalendars() {
  yield takeEvery("UPDATE_CALENDAR", updateCalendar);
}
