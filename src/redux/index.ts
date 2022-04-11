import { createStore, combineReducers } from "redux";
import dateReducer, { DateI } from "./reducers/date/date";

export interface InitialValueI {
  status: "loading" | "success" | "error" | "idle";
}

export interface ReduxStateI {
  date: DateI;
}

const store = createStore(
  combineReducers({
    date: dateReducer,
  })
);

export default store;
