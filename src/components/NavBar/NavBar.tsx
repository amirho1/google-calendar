import React, { FC } from "react";
import styles from "./NavBar.module.scss";
import NavMain from "../NavMain/NavMain";
import NavSettings from "../NavSettings/NavSettings";
import { useLocation } from "react-router";

interface NavBarProps {
  closeSideBar: () => void;
}

const NavBar: FC<NavBarProps> = ({ closeSideBar }) => {
  const { pathname } = useLocation();
  return (
    <div className={styles.NavBar} data-testid="NavBar">
      {pathname.match("/settings") ? (
        <NavSettings />
      ) : (
        <NavMain closeSideBar={closeSideBar} />
      )}
    </div>
  );
};

export default NavBar;
