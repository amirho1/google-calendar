import React, { FC, useCallback, useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { CalendarsI, GET_CALENDARS } from "../../redux/sagas/calendars";
import HoverCircle from "../HoverCircle/HoverCircle";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./Calendars.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CalendarsProps {}

const Calendars: FC<CalendarsProps> = () => {
  const calendars = useSelector<ReduxStateI, CalendarsI[]>(
    state => state.calendars.calendars
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_CALENDARS });
  }, [dispatch]);

  const cb = useCallback<CB>(
    (value: IItem, _, index, setChildDisplay, childDisplay) => (
      <div
        className={`${styles.row} f-between`}
        onClick={() => setChildDisplay && setChildDisplay(current => !current)}>
        <span className={styles.tag}>{value.tag}</span>

        <div className="f-between">
          {value.tag === "تقویم های دیگر" ? (
            <HoverCircle
              width="30px"
              height="30px"
              dataTip="اضافه کردن تقویم جدید">
              <FaPlus />
            </HoverCircle>
          ) : null}
          {childDisplay ? <RiArrowDownSLine /> : <RiArrowUpSLine />}{" "}
        </div>
      </div>
    ),
    []
  );

  const childCb = useCallback<CB>(
    item => (
      <div className={`${styles.row} f-between`}>
        <input type="checkbox" name="" id="" />
        <div data-tip={item.tag} className={styles.myCalenders}>
          {item.tag}
        </div>

        <BsThreeDotsVertical
          className={styles.setting}
          data-tip={"Click to view"}
          data-for={"view-tip"}
        />
      </div>
    ),
    []
  );

  const mappedCalenders = useMemo<IItem[]>(
    () => calendars.map(calendar => ({ tag: calendar.name, cb: childCb })),
    [calendars, childCb]
  );

  const listOfItems = useMemo<IItem[]>(
    () => [
      {
        tag: "تقویم های من",
        cb: cb,
        children: [...mappedCalenders],
      },
      {
        tag: "تقویم های دیگر",
        cb: cb,
      },
    ],
    [cb, mappedCalenders]
  );

  return (
    <div className={styles.Calendars} data-testid="Calendars">
      <ULLinks listOfItems={listOfItems} />
    </div>
  );
};

export default Calendars;
