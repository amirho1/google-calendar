import React, { FC, HTMLAttributes } from "react";
import CalMonth from "../CalMonth/CalMonth";
import styles from "./Sidebar.module.scss";

interface SidebarProps extends HTMLAttributes<HTMLElement> {}

const Sidebar: FC<SidebarProps> = props => {
  return (
    <aside className={styles.Sidebar} data-testid="Sidebar" {...props}>
      <div className={styles.SideBarHead}></div>
      <div className={styles.SideBarBody}>
        <CalMonth height="228px" width="211px" className="m-auto" />
      </div>
    </aside>
  );
};

export default Sidebar;
