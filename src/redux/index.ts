import { createStore, combineReducers, applyMiddleware } from "redux";
import dateReducer, { DateI } from "./reducers/date/date";
import calendarsReducer, { CalendarsStateI } from "./reducers/calendars/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import eventsReducer, { EventsStateI } from "./reducers/events/events";

export interface InitialValueI {
  status: "loading" | "success" | "error" | "idle";
}

export interface ReduxStateI {
  date: DateI;
  calendars: CalendarsStateI;
  events: EventsStateI;
}

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  date: dateReducer,
  calendars: calendarsReducer,
  events: eventsReducer,
});

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
