import { createStore, combineReducers, applyMiddleware } from "redux";
import dateReducer, { DateI } from "./reducers/date/date";
import calendarsReducer, { CalendarsStateI } from "./reducers/calendars/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
export interface InitialValueI {
  status: "loading" | "success" | "error" | "idle";
}

export interface ReduxStateI {
  date: DateI;
  calendars: CalendarsStateI;
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    date: dateReducer,
    calendars: calendarsReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
