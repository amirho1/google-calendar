import React from "react";
import { Route } from "react-router-dom";

export interface RouteI {
  name?: string;
  index?: boolean;
  component: JSX.Element;
  nest?: RouteI[];
}

export default function routes(routesList: RouteI[]) {
  return routesList.map((route, i) => (
    <Route
      key={i}
      path={!route.index ? `${route.name}` : undefined}
      index={route.index}
      element={route.component}>
      {route.nest ? routes(route.nest) : null}
    </Route>
  ));
}

export const rc = (
  component: JSX.Element,
  name?: string,
  index?: boolean,
  nest?: RouteI[]
): RouteI => ({ name, index, component, nest });
