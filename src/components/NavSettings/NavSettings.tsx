import React, { FC } from "react";
import styles from "./NavSettings.module.scss";
import { FaArrowRight } from "react-icons/fa";
import HoverCircle from "../HoverCircle/HoverCircle";
import { Link } from "react-router-dom";

interface NavSettingsProps {}

const NavSettings: FC<NavSettingsProps> = () => (
  <div className={`${styles.NavSettings} f-between`} data-testid="NavSettings">
    <HoverCircle className="pointer">
      <Link to="/">
        <FaArrowRight />
      </Link>
    </HoverCircle>
    <h1>تنظیمات</h1>
  </div>
);

export default NavSettings;
