import { Moment } from "moment-jalaali";
import React, { FC, HTMLAttributes, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setDate } from "../../redux/reducers/date/actions";
import Calendars from "../Calendars/Calendars";
import CalMonth from "../CalMonth/CalMonth";
import styles from "./Sidebar.module.scss";

interface SidebarProps extends HTMLAttributes<HTMLElement> {}

const Sidebar: FC<SidebarProps> = props => {
  const dispatch = useDispatch();
  const onDateChange = useCallback(
    (moment: Moment) => {
      dispatch(setDate(moment));
    },
    [dispatch]
  );

  return (
    <aside className={styles.Sidebar} data-testid="Sidebar" {...props}>
      <div className={styles.SideBarHead}></div>
      <div className={styles.SideBarBody}>
        <CalMonth
          height="fit-content"
          width="211px"
          className="m-auto"
          onDateChange={onDateChange}
        />

        <Calendars />
      </div>
    </aside>
  );
};

export default Sidebar;
