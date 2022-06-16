import moment, { Moment } from "moment-jalaali";
import React, {
  FC,
  useCallback,
  // useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
// import { RoutesContext } from "../../App";
import useKeyDown from "../../hooks/useKeyDown";
import { ReduxStateI } from "../../redux";
import {
  decreaseDay,
  increaseDay,
  setDate,
} from "../../redux/reducers/date/actions";
import { convertFinglishMonthToPersian } from "../../utils/helpers";
import Button from "../Button/Button";
import DateD from "../DateD/DateD";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Modal from "../Modal/Modal";
import ULLinks, { IItem } from "../ULLinks/ULLinks";
import UserImage from "../UserImage/UserImage";
import styles from "./NavMain.module.scss";

interface NavMainProps {
  closeSideBar: () => void;
}

const NavMain: FC<NavMainProps> = ({ closeSideBar }) => {
  const pageStyleBtnRef = useRef<HTMLButtonElement>(null);
  const [pageListStyleDisplay, setPageListStyleDisplay] = useState(false);

  const location = useLocation().pathname.split("/")[1];

  // const { routes } = useContext(RoutesContext);
  const mappedPageStyleList = useMemo<IItem[]>(
    () => [
      {
        tag: "روز",
        cb: value => (
          <Link to="/" className={styles.Link}>
            {value.tag}
          </Link>
        ),
      },
      {
        tag: "هفته",
        cb: value => (
          <Link to="week" className={styles.Link}>
            {value.tag}
          </Link>
        ),
      },
    ],
    []
  );

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);

  const monthName = useMemo(
    () => convertFinglishMonthToPersian(date.format("jMMMM")),
    [date]
  );
  const dispatch = useDispatch();

  const year = useMemo(() => date.format("jYYYY"), [date]);

  const onClickNext = useCallback(
    e => {
      e.stopPropagation();
      dispatch(increaseDay());
    },
    [dispatch]
  );
  const onClickPrevious = useCallback(
    e => {
      e.stopPropagation();
      dispatch(decreaseDay());
    },
    [dispatch]
  );

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

  const today = useCallback(() => {
    dispatch(setDate(moment()));
  }, [dispatch]);
  return (
    <div className={`${styles.right} f-around`} data-testid="NavMain">
      <HamburgerMenu
        onClick={e => {
          e.stopPropagation();
          closeSideBar();
        }}
        dataTip={"فهرست اصلی"}
      />

      <Button
        children={"امروز"}
        dataTip={`${monthName} ${year}`}
        onClick={today}
        type="button"
      />

      <DateD
        fontSize="1.3rem"
        year={parseInt(year, 10)}
        monthName={monthName}
        onClickPrevious={onClickPrevious}
        onCLickNext={onClickNext}
        nextBtnDataTip="روز بعد"
        previousBtnDataTip="روز قبل"
      />

      <Button
        type="button"
        ref={pageStyleBtnRef}
        onClick={onPageStyleBtnClick}
        children={
          <div className="f-center p-relative ">
            {useKeyDown(e => {
              if (e.key === "Escape") setPageListStyleDisplay(false);
            })}
            {location === "" ? "روز" : "هفته"} <RiArrowDownSFill />
            <Modal
              x={-90}
              y={40}
              display={pageListStyleDisplay}
              zIndex={100}
              height={"200px"}
              width={`200px`}>
              <ULLinks
                listOfItems={mappedPageStyleList}
                liClassName="list-item"
              />
            </Modal>
          </div>
        }
      />

      <UserImage />
    </div>
  );
};

export default NavMain;
