import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { SAVE_ADDED_EVENT } from "../../redux/reducers/events/events";
import { addEvent } from "../../redux/sagas/events";
import {
  convertEnglishWeekdaysToPersian,
  convertHoursToMinutes,
  convertMinutesToHours,
  roundSpecific,
} from "../../utils/helpers";
import EventForm from "../EventForm/EventForm";
import HoverCircle from "../HoverCircle/HoverCircle";
import Line from "../Line/Line";
import Modal from "../Modal/Modal";
import Task from "../Task/Task";
import TimeLine from "../TimeLine/TimeLine";
import styles from "./Day.module.scss";

interface DayProps {}

const centerOFScreen = () => ({
  x: window.innerWidth / 2 - 225,
  y: window.innerHeight / 2 - 225,
});

function drawManyLine(num: number) {
  const lines: JSX.Element[] = [];

  for (let i = 0; i < num; i++) {
    const line = (
      <Line
        key={i}
        color="var(--gray)"
        width="100%"
        height="1px"
        hour={i ? i : undefined}
      />
    );
    lines.push(line);
  }

  return lines;
}

const Day: FC<DayProps> = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [headerBottomBorderDisplay, setHeaderBottomBorderDisplay] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [events, setEvents] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch();
  const [refOFEventFormModal, setRefOFEventFormModal] =
    useState<React.RefObject<HTMLDivElement>>();

  const getRef = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    setRefOFEventFormModal(ref);
  }, []);

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);

  const day = useMemo(() => date.format("jDD"), [date]);
  const weekday = useMemo(
    () =>
      convertEnglishWeekdaysToPersian(date.format("dddd").toLowerCase() as any),
    [date]
  );

  const [eventForm, setEventForm] = useState({
    ...centerOFScreen(),
    date,
    display: false,
    eventStartTime: 0,
    eventEndTime: 0,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setMinutes(convertHoursToMinutes(moment()));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

  const onStartTimeChange = useCallback((startTime: number) => {
    setEventForm(current => ({ ...current, startTime }));
  }, []);

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      // prevent from right click
      if (e.button === 2 || eventForm.display) return;
      e.stopPropagation();
      setIsMouseDown(true);
      const { y } = e.currentTarget.getBoundingClientRect();
      const eventStartTime = roundSpecific(e.clientY - y, 15);
      const dateClone = date.clone();
      const time = convertMinutesToHours(eventStartTime).split(" ")[0];
      const h = +time.split(":")[0];
      const m = +time.split(":")[1];

      dispatch({ type: SAVE_ADDED_EVENT });

      dateClone.set({ h, m });

      setEventForm(current => ({
        ...current,
        eventStartTime,
        eventEndTime: 60,
      }));

      const modal = (
        <Modal
          key={events.length}
          children={<Task />}
          boxShadow={false}
          data-testid="Task"
          backgroundColor="var(--blue)"
          x={0}
          y={eventStartTime}
          resizeAble={true}
          width={`${100}%`}
          display={true}
          height="60px"
        />
      );
      setEvents(current => [...current, modal]);
    },
    [eventForm.display, date, dispatch, events.length]
  );

  const onMouseUp = useCallback<React.MouseEventHandler<HTMLDivElement>>(e => {
    if (e.button === 2) return;

    setEventForm(current => {
      return { ...current, display: !current.display };
    });
    setIsMouseDown(true);
  }, []);

  const onEventFormHeaderMouseDown = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    e => {
      // coordinate on mousedown
      let x = e.clientX;
      let y = e.clientY;
      const { x: previousX, y: previousY } =
        refOFEventFormModal && refOFEventFormModal.current
          ? refOFEventFormModal?.current.getBoundingClientRect()
          : { x: 0, y: 0 };

      const onMouseMove = (event: MouseEvent) => {
        if (refOFEventFormModal && refOFEventFormModal?.current?.style) {
          const dx = event.clientX - x;
          const dy = event.clientY - y;

          refOFEventFormModal.current.style.top = `${previousY + dy}px`;
          refOFEventFormModal.current.style.left = `${previousX + dx}px`;
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [refOFEventFormModal]
  );

  const closeModalEventForm = useCallback(() => {
    setEventForm(current => ({ ...current, display: false }));
  }, []);

  return (
    <div className={styles.Day} data-testid="Day">
      <Modal
        display={eventForm.display}
        getRef={getRef}
        zIndex={1000}
        height="fit-content"
        width="450px"
        position="fixed"
        x={eventForm.x}
        y={eventForm.y}>
        <EventForm
          eventEndTime={eventForm.eventEndTime}
          onHeaderMouseDown={onEventFormHeaderMouseDown}
          date={eventForm.date}
          eventStartTime={eventForm.eventStartTime}
          setModalDisplay={closeModalEventForm}
          onStartTimeChange={onStartTimeChange}
        />
      </Modal>

      <div
        className={styles.Header}
        style={{
          borderBottom: headerBottomBorderDisplay
            ? "2px solid var(--gray)"
            : undefined,
        }}>
        <div className={styles.Info} data-testid="Info">
          <span className={styles.Weekday}>{weekday}</span>
          <HoverCircle
            hover={false}
            background={true}
            backgroundColor={"var(--blue)"}
            width="50px"
            height="50px"
            className="pointer">
            <div className={styles.date}>{day}</div>
          </HoverCircle>
        </div>
      </div>

      <main
        className={styles.main}
        onScroll={e => {
          setHeaderBottomBorderDisplay(e.currentTarget.scrollTop);
        }}>
        <div className={styles.space}></div>
        <div
          className={styles.CalendarWrapper}
          data-testid="calendarWrapper"
          // onMouseMove={onMouseMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}>
          <TimeLine y={minutes} color="red" />
          {events}
          <Line
            vertical={true}
            height="100%"
            width="1"
            right="20px"
            top="-2%"
          />
          {drawManyLine(24)}
        </div>
      </main>
    </div>
  );
};

export default Day;
