import React from "react";
import DayP from "./DayP/DayP";
import WeekP from "./WeekP/WeekP";
import { Route } from "react-router-dom";

interface RouteI {
  name: string;
  component: JSX.Element;
}

export default function routes() {
  const routes: RouteI[] = [
    { name: "day", component: <DayP /> },
    { name: "week", component: <WeekP /> },
  ];

  return routes.map(route => (
    <Route path={route.name} element={route.component} />
  ));
}
