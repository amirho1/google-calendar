import React, {
  FC,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { RoutesContext } from "../../App";
import { ReduxStateI } from "../../redux";
import { DateI } from "../../redux/reducers/date/date";
import Button from "../Button/Button";
import DateD from "../DateD/DateD";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Modal from "../Modal/Modal";
import ULLinks, { IItem } from "../ULLinks/ULLinks";
import styles from "./NavMain.module.scss";

interface NavMainProps {
  closeSideBar: () => void;
}

const NavMain: FC<NavMainProps> = ({ closeSideBar }) => {
  const pageStyleBtnRef = useRef<HTMLButtonElement>(null);
  const [pageListStyleDisplay, setPageListStyleDisplay] = useState(false);

  const location = useLocation().pathname.split("/")[1];

  const { routes } = useContext(RoutesContext);
  const mappedPageStyleList = useMemo<IItem[]>(
    () => [
      {
        tag: "روز",
        cb: value => (
          <Link to={routes["/"]?.nest?.day?.path || ""} className={styles.Link}>
            {value.tag}
          </Link>
        ),
      },
      {
        tag: "هفته",
        cb: value => (
          <Link
            to={routes["/"]?.nest?.week?.path || ""}
            className={styles.Link}>
            {value.tag}
          </Link>
        ),
      },
    ],
    []
  );

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
    <div className={`${styles.right} f-around`}>
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
          <div className="f-center p-relative ">
            {location === "day" ? "روز" : "هفته"} <RiArrowDownSFill />
            <Modal
              x={-90}
              y={40}
              display={pageListStyleDisplay}
              zIndex={1000}
              height={"200px"}
              width={`200px`}>
              <ULLinks
                listOfItems={mappedPageStyleList}
                ulClassName={styles.ul}
                aClassName={styles.anchor}
              />
            </Modal>
          </div>
        }
      />
    </div>
  );
};

export default NavMain;