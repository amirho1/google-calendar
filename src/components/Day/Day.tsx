import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import moment, { Moment } from "moment-jalaali";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { EventI } from "../../redux/reducers/events/events";
import { addEvent, getEvents } from "../../redux/sagas/events";
import {
  convertEnglishWeekdaysToPersian,
  convertHoursToMinutes,
  convertMinutesToHours,
  roundSpecific,
} from "../../utils/helpers";
import EventForm from "../EventForm/EventForm";
import HoverCircle from "../HoverCircle/HoverCircle";
import Line from "../Line/Line";
import Modal, { onEventMouseDown } from "../Modal/Modal";
import Task from "../Task/Task";
import TimeLine from "../TimeLine/TimeLine";
import styles from "./Day.module.scss";

interface DayProps {}

export type OnDateChangeT = (newDate: Moment) => void;

const centerOFScreen = () => ({
  x: window.innerWidth / 2 - 225,
  y: window.innerHeight / 2 - 225,
});

function drawCalendarLines(num: number) {
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
  const [timeLineMinutes, setTimeLineMinutes] = useState(0);
  const dispatch = useDispatch();
  const [eventFormModalRef, setEventFormModalRef] =
    useState<React.RefObject<HTMLDivElement>>();
  const getRef = useCallback(
    (ref: React.RefObject<HTMLDivElement>) => setEventFormModalRef(ref),
    []
  );

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);

  const timeStamp = useMemo(() => date.valueOf(), [date]);

  const events = useSelector<ReduxStateI, EventI[]>(
    state => state.events.events[timeStamp] || []
  );

  const day = useMemo(() => date.format("jDD"), [date]);

  const weekday = useMemo(
    () =>
      convertEnglishWeekdaysToPersian(date.format("dddd").toLowerCase() as any),
    [date]
  );

  const [eventForm, setEventForm] = useState({
    ...centerOFScreen(),
    title: "",
    description: EditorState.createEmpty(),
    date: date.clone(),
    display: false,
    eventStartTime: 0,
    eventEndTime: 0,
  });

  useEffect(() => {
    const id = setInterval(
      () => setTimeLineMinutes(convertHoursToMinutes(moment())),
      1000
    );

    return () => clearInterval(id);
  });

  const onStartTimeChange = useCallback(
    (startTime: number) =>
      setEventForm(current => {
        return { ...current, eventStartTime: startTime };
      }),
    []
  );

  const onEndTimeChang = useCallback((endTime: number) => {
    setEventForm(current => {
      return { ...current, eventEndTime: endTime - current.eventStartTime };
    });
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

      dateClone.set({ h, m });
      setEventForm(current => ({
        ...current,
        eventStartTime: roundSpecific(e.clientY - y, 15),
        eventEndTime: 60,
      }));
    },
    [eventForm.display, date]
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
        eventFormModalRef && eventFormModalRef.current
          ? eventFormModalRef?.current.getBoundingClientRect()
          : { x: 0, y: 0 };

      const onMouseMove = (event: MouseEvent) => {
        if (eventFormModalRef && eventFormModalRef?.current?.style) {
          const dx = event.clientX - x;
          const dy = event.clientY - y;

          eventFormModalRef.current.style.top = `${previousY + dy}px`;
          eventFormModalRef.current.style.left = `${previousX + dx}px`;
        }
      };

      const onMouseUp = (e: MouseEvent) => {
        e.stopPropagation();

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [eventFormModalRef]
  );

  const closeModalEventForm = useCallback(
    () => setEventForm(current => ({ ...current, display: false })),
    []
  );

  // fetch events
  useEffect(() => {
    dispatch(getEvents.ac({ timeStamp: `${timeStamp}` }));
  }, [dispatch, timeStamp]);

  const onDescriptionChange = useCallback((editorState: EditorState) => {
    setEventForm(current => ({ ...current, description: editorState }));
  }, []);

  const onTitleChange = useCallback((newDescription: string) => {
    setEventForm(current => ({ ...current, title: newDescription }));
  }, []);

  const handleAddingEvent = useCallback(() => {
    const event: EventI = {
      description: convertToHTML(eventForm.description.getCurrentContent()),
      endTime: eventForm.eventEndTime,
      startTime: eventForm.eventStartTime,
      title: eventForm.title,
    };

    dispatch(addEvent.ac({ body: event, calName: "tasks", timeStamp }));
    setEventForm(current => ({
      ...current,
      display: false,
      eventEndTime: 0,
      description: EditorState.createEmpty(),
      title: "",
      eventStartTime: 0,
    }));
  }, [
    dispatch,
    eventForm.description,
    eventForm.eventEndTime,
    eventForm.eventStartTime,
    eventForm.title,
    timeStamp,
  ]);

  const onEventMouseDown = useCallback(
    (id: number): onEventMouseDown =>
      (e, ref) => {
        e.preventDefault();
        e.stopPropagation();
        if (ref.current) {
          let mouseDownY = e.clientY;
          ref.current.style.cursor = "move";
          ref.current.style.zIndex = "2000";
          const currentY = parseInt(ref.current.style.top, 10);

          const onMouseMove = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
          ) => {
            const dy = e.clientY - mouseDownY;
            const plus = currentY + dy;
            const endLimit = 1380;
            const y = plus < 0 ? 0 : plus >= endLimit ? endLimit : plus;
            if (ref.current) ref.current.style.top = `${y}px`;
          };

          const onMouseUp = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
          ) => {
            e.stopPropagation();
            if (ref.current) {
              ref.current.style.cursor = "initial";
              ref.current.style.zIndex = "900";

              document.removeEventListener("mousemove", onMouseMove as any);
              ref.current.removeEventListener("mouseup", onMouseUp as any);
              document.removeEventListener("mouseup", onMouseUp as any);
            }
          };

          ref.current.addEventListener("mouseup", onMouseUp as any);
          document.addEventListener("mouseup", onMouseUp as any);
          document.addEventListener("mousemove", onMouseMove as any);
        }
      },
    []
  );

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
          handleAddingEvent={handleAddingEvent}
          eventEndTime={eventForm.eventEndTime}
          onEndTimeChang={onEndTimeChang}
          eventStartTime={eventForm.eventStartTime}
          setModalDisplay={closeModalEventForm}
          onStartTimeChange={onStartTimeChange}
          onHeaderMouseDown={onEventFormHeaderMouseDown}
          title={eventForm.title}
          description={eventForm.description}
          onDescriptionChange={onDescriptionChange}
          onTitleChange={onTitleChange}
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
          {moment().startOf("day").valueOf() ===
          date.startOf("day").valueOf() ? (
            <TimeLine y={timeLineMinutes} color="red" />
          ) : null}

          <Modal
            children={
              <Task
                startTime={eventForm.eventStartTime}
                endTime={eventForm.eventEndTime}
              />
            }
            boxShadow={false}
            data-testid="Task"
            backgroundColor="var(--blue)"
            x={0}
            y={eventForm.eventStartTime}
            resizeAble={true}
            width={`${100}%`}
            display={eventForm.display}
            height={`${eventForm.eventEndTime}px`}
          />

          {events.map(
            ({ description, endTime, startTime, title, id }, index) => (
              <Modal
                key={index}
                children={
                  <Task title={title} endTime={endTime} startTime={startTime} />
                }
                boxShadow={false}
                data-testid="Task"
                backgroundColor="var(--blue)"
                x={0}
                y={startTime}
                resizeAble={true}
                width={`${100}%`}
                display={true}
                height="60px"
                onMouseUp={e => e.stopPropagation()}
                onMouseDown={onEventMouseDown(id || 0)}
              />
            )
          )}

          <Line
            vertical={true}
            height="100%"
            width="1"
            right="20px"
            top="-2%"
          />
          {drawCalendarLines(24)}
        </div>
      </main>
    </div>
  );
};

export default Day;
