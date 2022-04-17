import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { DateI } from "../../redux/reducers/date/date";
import Button from "../Button/Button";
import DateD from "../DateD/DateD";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import styles from "./NavBar.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import Modal from "../Modal/Modal";
import ULLinks, { IItem } from "../ULLinks/ULLinks";
import { Link, useLocation } from "react-router-dom";

interface NavBarProps {
  closeSideBar: () => void;
}

const NavBar: FC<NavBarProps> = ({ closeSideBar }) => {
  const pageStyleBtnRef = useRef<HTMLButtonElement>(null);
  const [pageStyleBtnXY, setPageStyleBtnRef] = useState({ x: 0, y: 0 });
  const [pageListStyleDisplay, setPageListStyleDisplay] = useState(false);

  const location = useLocation().pathname.split("/")[1];

  const mappedPageStyleList = useMemo<IItem[]>(
    () => [
      {
        tag: "روز",
        cb: value => (
          <Link to="/day" className={styles.Link}>
            {value.tag}
          </Link>
        ),
      },
      {
        tag: "هفته",
        cb: value => (
          <Link to="/week" className={styles.Link}>
            {value.tag}
          </Link>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const { x, y }: any = pageStyleBtnRef.current?.getBoundingClientRect();
    setPageStyleBtnRef({ x: x - 100, y: y + 50 });
  }, [pageStyleBtnRef]);

  const { monthName, year } = useSelector<ReduxStateI, DateI>(
    state => state.date
  );

  const onClickNext = () => {};
  const onClickPrevious = () => {};

  const onPageStyleBtnClick = useCallback<
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  >(e => {
    e.stopPropagation();
    setPageListStyleDisplay(previous => !previous);
    window.addEventListener("click", () => {
      e.stopPropagation();
      setPageListStyleDisplay(false);
    });
  }, []);

  return (
    <div className={styles.NavBar} data-testid="NavBar">
      <div className={`${styles.right} f-around`}>
        <Modal
          x={pageStyleBtnXY.x}
          y={pageStyleBtnXY.y}
          display={pageListStyleDisplay}
          // backgroundColor="white"
          height={"200px"}
          width={`200px`}>
          <ULLinks
            listOfItems={mappedPageStyleList}
            ulClassName={styles.ul}
            aClassName={styles.anchor}
          />
        </Modal>

        <HamburgerMenu
          onClick={e => {
            e.stopPropagation();
            closeSideBar();
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
          ref={pageStyleBtnRef}
          onClick={onPageStyleBtnClick}
          children={
            <p className="f-center">
              {location === "day" ? "روز" : "هفته"} <RiArrowDownSFill />
            </p>
          }
        />
      </div>
    </div>
  );
};

export default NavBar;
