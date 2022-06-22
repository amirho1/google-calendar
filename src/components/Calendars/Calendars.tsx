import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaPlus } from "react-icons/fa";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import {
  CalendarI,
  deleteCalendar,
  getCalendars,
} from "../../redux/sagas/calendars";
import HoverCircle from "../HoverCircle/HoverCircle";
import ULLinks, { CB, IItem } from "../ULLinks/ULLinks";
import styles from "./Calendars.module.scss";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import { centerOFScreen } from "../Day/Day";
import Confirmation from "../Confirmation/Confirmation";
import { FadeContext } from "../../App";
import CalRow from "./CalRow/CalRow";
import useKeyDown from "../../hooks/useKeyDown";

interface CalendarsProps {}

const Calendars: FC<CalendarsProps> = () => {
  const { closeFade, openFade } = useContext(FadeContext);

  const [confirm, setConfirm] = useState({
    display: false,
    id: "",
    calName: "",
  });
  const [calendars] = useSelector<ReduxStateI, [CalendarI[]]>(state => [
    state.calendars.calendars,
  ]);
  const onCalendarDelete = useCallback(
    (id: string, calName: string) => {
      openFade();
      setConfirm({ id, display: true, calName });
    },
    [openFade]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // get calendars name and colors
    dispatch(getCalendars.ac());
  }, [dispatch]);

  const cb = useCallback<CB>(
    (value: IItem, _, index, setChildDisplay, childDisplay) => (
      <div
        className={`${styles.row} f-between pointer hoverBGGray`}
        onClick={() => setChildDisplay && setChildDisplay(current => !current)}>
        <span className={styles.tag}>{value.tag}</span>

        <div className="f-between">
          {value.tag === "تقویم های دیگر" ? (
            <HoverCircle
              width="30px"
              height="30px"
              dataTip="اضافه کردن تقویم جدید">
              <Link to="/settings/create-new-calendar">
                <FaPlus />
              </Link>
            </HoverCircle>
          ) : null}
          {childDisplay ? (
            <RiArrowDownSLine className={styles.arrow} />
          ) : (
            <RiArrowUpSLine className={styles.arrow} />
          )}{" "}
        </div>
      </div>
    ),
    []
  );

  const childCb = useCallback(
    (calendar: CalendarI, index: number, id: string): CB => {
      return item => (
        <CalRow
          item={item}
          calendar={calendar}
          onCalendarDelete={onCalendarDelete}
        />
      );
    },
    [onCalendarDelete]
  );

  const mappedCalenders = useMemo<IItem[]>(
    () =>
      calendars.map((calendar, index) => ({
        tag: calendar.name,
        cb: childCb(calendar, index, calendar?._id || "0"),
      })),
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

  const { x, y } = useMemo(() => centerOFScreen(), []);

  const onDecline = useCallback(() => {
    closeFade();
    setConfirm(current => ({ ...current, display: false }));
  }, [closeFade]);

  const onConfirm = useCallback(() => {
    closeFade();
    setConfirm(current => ({ ...current, display: false }));
    dispatch(deleteCalendar.ac(confirm.id));
  }, [closeFade, confirm.id, dispatch]);

  useKeyDown(({ key }) => {
    if (key === "Escape")
      setConfirm(current => ({ ...current, display: false }));
  });

  return (
    <div className={styles.Calendars} data-testid="Calendars">
      <Modal
        display={confirm.display}
        x={x}
        y={y}
        height=""
        width=""
        zIndex={220}>
        <Confirmation
          onDecline={onDecline}
          onConfirm={onConfirm}
          text={`مطمئنید می‌خواهید ${confirm.calName} را حذف کنید؟ دیگر به این تقویم و رویدادهایش دسترسی نخواهید داشت. سایر افراد دارای دسترسی به این تقویم می‌توانند همچنان از آن استفاده کنند`}
        />
      </Modal>

      <ULLinks listOfItems={listOfItems} />
    </div>
  );
};

export default Calendars;
