import React, { FC } from "react";
import HoverCircle from "../HoverCircle/HoverCircle";
import styles from "./HamburgerMenu.module.scss";

interface HamburgerMenuProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  dataTip?: string;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ onClick, dataTip }) => {
  return (
    <HoverCircle
      dataTip={dataTip}
      width="50px"
      height="50px"
      className="pointer">
      <div onClick={onClick}>
        <div className={styles.HamburgerMenu} data-testid="HamburgerMenu"></div>
      </div>
    </HoverCircle>
  );
};

export default HamburgerMenu;
