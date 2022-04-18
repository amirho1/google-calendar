import React, { FC, HTMLAttributes } from "react";
import Calendars from "../Calendars/Calendars";
import CalMonth from "../CalMonth/CalMonth";
import styles from "./Sidebar.module.scss";

interface SidebarProps extends HTMLAttributes<HTMLElement> {}

const Sidebar: FC<SidebarProps> = props => {
  return (
    <aside className={styles.Sidebar} data-testid="Sidebar" {...props}>
      <div className={styles.SideBarHead}></div>
      <div className={styles.SideBarBody}>
        <CalMonth height="fit-content" width="211px" className="m-auto" />
        <Calendars />
      </div>
    </aside>
  );
};

export default Sidebar;
