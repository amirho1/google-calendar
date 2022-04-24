import { Route } from "react-router-dom";

export interface RouteI {
  path?: string;
  index?: boolean;
  element: JSX.Element;
  nest?: RoutesI;
}

export interface RoutesI {
  [routePath: string]: RouteI;
}

export default class SiteMap {
  constructor(public routes: RoutesI) {}

  routesToJSX(routes: RoutesI) {
    const jsxArr: JSX.Element[] = [];
    let index = 0;
    for (let route in routes) {
      const currentRoute = routes[route];
      const jsx = (
        <Route
          key={index}
          path={currentRoute.path || undefined}
          element={currentRoute.element}
          index={currentRoute.index}>
          {currentRoute.nest ? this.routesToJSX(currentRoute.nest) : null}
        </Route>
      );
      jsxArr.push(jsx);
      ++index;
    }

    return jsxArr;
  }
}
