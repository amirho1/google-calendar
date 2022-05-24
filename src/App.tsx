import React, { createContext, useCallback, useState } from "react";
import styles from "./App.module.scss";
import useTitle from "./hooks/useTitle";
import "./styles/globals.scss";
import NavBar from "./components/NavBar/NavBar";
import Main from "./pages/Main/Main";
import { Outlet, Route, Routes } from "react-router";
import Settings from "./pages/Settings/Settings";
import DayP from "./pages/DayP/DayP";
import WeekP from "./pages/WeekP/WeekP";
import CalendarForm from "./components/CalendarForm/CalendarForm";
import SiteMap from "./utils/SiteMap";
import { ReduxStateI } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";
import { centerOFScreen } from "./components/Day/Day";
import Notification from "./components/Notification/Notification";
import { CLOSE_NOTIFICATION } from "./redux/reducers/notifications/notifications";
import Fade from "./components/Fade/Fade";
import "tippy.js/dist/tippy.css";
import routes, { RouteI } from "./pages/routes";
import FOF from "./components/FOF/FOF";
import TestNetWorkConnection from "./components/TestNetWorkConnection/TestNetWorkConnection";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

// it has some problems with types
export const FadeContext = createContext({
  display: false,
  openFade: () => {},
  closeFade: () => {},
});

export const RoutesContext = createContext<SiteMap>(new SiteMap({}));

export const SidebarContext = createContext({ display: false });

function App() {
  const [fadeDisplay, setFadeDisplay] = useState(false);
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

  const routesList: RouteI[] = [
    {
      component: <Main sideBarDisplay={sideBarDisplay} />,
      name: "/",
      nest: [
        { component: <DayP />, index: true },
        { component: <WeekP />, name: "week" },
      ],
    },
    {
      component: <Settings />,
      name: "settings",
      nest: [
        {
          name: "create-new-calendar",
          component: <CalendarForm />,
        },
      ],
    },
  ];

  const closeNotification = useCallback(() => {
    dispatch(CLOSE_NOTIFICATION());
  }, [dispatch]);

  const openFade = useCallback(() => {
    setFadeDisplay(true);
  }, []);

  const closeFade = useCallback(() => {
    setFadeDisplay(false);
  }, []);

  return (
    <SidebarContext.Provider value={{ display: sideBarDisplay }}>
      <FadeContext.Provider
        value={{ openFade, closeFade, display: fadeDisplay }}>
        <div className={`${styles.App}`} data-testid="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="/"
              element={
                <>
                  <NavBar closeSideBar={closeSideBar} />

                  <main className={styles.Main}>
                    <Outlet />
                  </main>
                </>
              }>
              {routes(routesList)}
            </Route>

            <Route path="*" element={<FOF />} />
          </Routes>

          <Fade display={fadeDisplay} />
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

          <TestNetWorkConnection />
        </div>
      </FadeContext.Provider>
    </SidebarContext.Provider>
  );
}

export default App;
