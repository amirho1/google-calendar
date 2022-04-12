import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { DateI } from "../../redux/reducers/date/date";
import Button from "../Button/Button";
import DateD from "../DateD/DateD";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import styles from "./NavBar.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const { monthName, year } = useSelector<ReduxStateI, DateI>(
    state => state.date
  );

  const onClickNext = () => {};
  const onClickPrevious = () => {};

  return (
    <div className={styles.NavBar} data-testid="NavBar">
      <div className={`${styles.right} f-around`}>
        <HamburgerMenu
          onClick={e => {
            e.preventDefault();
            console.log("hello world");
          }}
          dataTip={"فهرست اصلی"}
        />
        <Button children={"Today"} dataTip={`${monthName} ${year}`} />

        <DateD
          fontSize="1.3rem"
          year={year}
          onClickPrevious={onClickPrevious}
          monthName={monthName}
          onCLickNext={onClickNext}
        />

        <Button
          children={
            <p className="f-center">
              Week <RiArrowDownSFill />
            </p>
          }
        />
      </div>
    </div>
  );
};

export default NavBar;
