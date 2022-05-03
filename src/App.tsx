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
import { ReduxStateI } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";
import { centerOFScreen } from "./components/Day/Day";
import Notification from "./components/Notification/Notification";
import { CLOSE_NOTIFICATION } from "./redux/reducers/notifications/notifications";

// it has some problems with types
const ReactTooltipAsAny = ReactTooltip as any;

export const RoutesContext = createContext<SiteMap>(new SiteMap({}));

export const SidebarContext = createContext({ display: false });

function App() {
  const dispatch = useDispatch();
  useTitle("تقویم فارسی گوگل");
  const [sideBarDisplay, setSideBarDisplay] = useState(true);

  const closeSideBar = useCallback(() => {
    setSideBarDisplay(previous => !previous);
  }, []);

  const notifications = useSelector<
    ReduxStateI,
    { message: string; display: boolean }
  >(state => ({
    message:
      state?.notifications?.notifications[
        state?.notifications?.notifications?.length - 1
      ]?.message || "",
    display: state.notifications.display,
  }));

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

  const closeNotification = useCallback(() => {
    dispatch(CLOSE_NOTIFICATION());
  }, [dispatch]);

  return (
    <RoutesContext.Provider value={routes}>
      <SidebarContext.Provider value={{ display: sideBarDisplay }}>
        <div className={`${styles.App}`} data-testid="App">
          <Modal
            x={centerOFScreen().x}
            y={window.innerHeight - 38}
            position="fixed"
            width="fit-content"
            height="fit-content"
            display={notifications.display}>
            <Notification
              message={notifications.message}
              closeNotification={closeNotification}
            />
          </Modal>

          <ReactTooltipAsAny />
          <NavBar closeSideBar={closeSideBar} />

          <main className={styles.Main}>
            <Routes>{routes.routesToJSX(routes.routes)}</Routes>
          </main>
        </div>
      </SidebarContext.Provider>
    </RoutesContext.Provider>
  );
}

export default App;
