import { Middleware } from "redux";

export const testNetworkConnection: Middleware = storeApi => next => action => {
  const isNetWorkOnline = window.navigator.onLine;
  if (!isNetWorkOnline) {
    storeApi.dispatch({ type: "" });
  } else return next(action);
};
