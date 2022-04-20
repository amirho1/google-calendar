import React, { createContext, useCallback, useMemo, useState } from "react";
import styles from "./App.module.scss";
import useTitle from "./hooks/useTitle";
import "./styles/globals.scss";
import ReactTooltip from "react-tooltip";
import NavBar from "./components/NavBar/NavBar";
import Main from "./pages/Main/Main";
import { Routes } from "react-router";
import Settings from "./pages/Settings/Settings";
import DayP from "./pages/DayP/DayP";
import WeekP from "./pages/WeekP/WeekP";
import CalendarForm from "./components/CalendarForm/CalendarForm";
import SiteMap, { RoutesI } from "./utils/SiteMap";

// it has some problems with types
const ReactTooltipAsAny = ReactTooltip as any;

export const RoutesContext = createContext<SiteMap>(new SiteMap({}));

function App() {
  useTitle("تقویم فارسی گوگل");
  const [sideBarDisplay, setSideBarDisplay] = useState(true);

  const closeSideBar = useCallback(() => {
    setSideBarDisplay(previous => !previous);
  }, []);

  const routesO: RoutesI = useMemo(
    () => ({
      "/": {
        path: "",
        element: <Main sideBarDisplay={sideBarDisplay} />,
        nest: {
          day: { element: <DayP />, path: "day" },
          week: { element: <WeekP />, path: "week" },
          index: { element: <DayP />, index: true },
        },
      },
      settings: {
        element: <Settings />,
        path: "settings",
        nest: {
          "create-new-calendar": {
            path: "create-new-calendar",
            element: <CalendarForm />,
          },
        },
      },
    }),
    [sideBarDisplay]
  );

  const routes = new SiteMap(routesO);

  return (
    <RoutesContext.Provider value={routes}>
      <div className={`${styles.App}`} data-testid="App">
        <ReactTooltipAsAny />
        <NavBar closeSideBar={closeSideBar} />

        <main className={styles.Main}>
          <Routes>{routes.routesToJSX(routes.routes)}</Routes>
        </main>
      </div>
    </RoutesContext.Provider>
  );
}

export default App;
