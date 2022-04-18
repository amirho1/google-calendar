import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { Api } from "../../../hooks/useFetch";
import { SAVE_CALENDARS } from "../../reducers/calendars";

export interface TaskI {
  dateFrom: string;
  dateTill: string;
  title: string;
  description: string;
}

export interface CalendarsI {
  id: number;
  name: string;
  color: string;
}

async function fetchCalenders() {
  const data = await Api({ method: "get", url: "/calendars" });
  return data.data;
}

export const GET_CALENDARS = "GET_CALENDARS";

function* getCalendars() {
  const calendars: AxiosResponse<CalendarsI, any> = yield call(fetchCalenders);
  yield put({ type: SAVE_CALENDARS, payload: calendars });
}

export default function* watchGettingCalenders() {
  yield takeLatest(GET_CALENDARS, getCalendars);
}
