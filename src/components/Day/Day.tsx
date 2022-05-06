import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import moment, { Moment } from "moment-jalaali";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateI } from "../../redux";
import { EventI } from "../../redux/reducers/events/events";
import { CalendarI } from "../../redux/sagas/calendars";
import { addEvent, getEvents } from "../../redux/sagas/events";
import {
  convertEnglishWeekdaysToPersian,
  convertHoursToMinutes,
  convertMinutesToHours,
  roundSpecific,
} from "../../utils/helpers";
import ContextMenu from "../ContextMenu/ContextMenu";
import Details from "../Details/Details";
import EventForm from "../EventForm/EventForm";
import HoverCircle from "../HoverCircle/HoverCircle";
import Line from "../Line/Line";
import Modal, { onEventMouseDownT } from "../Modal/Modal";
import Task from "../Task/Task";
import TimeLine from "../TimeLine/TimeLine";
import styles from "./Day.module.scss";
import { useImmerReducer } from "use-immer";
import { PrimitivesT } from "../Table/Table";
import Plus from "../Plus/Plus";
import { FadeContext, SidebarContext } from "../../App";

interface DayProps {}

export type OnDateChangeT = (newDate: Moment) => void;

export const centerOFScreen = () => ({
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

interface EventDetailsI {
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  calendarName: string;
  alarm: number;
}

interface NotificationStateI {
  display: boolean;
  message: PrimitivesT | JSX.Element;
}

export type OnColorChangeT = (color: string) => void;

const Day: FC<DayProps> = () => {
  const { closeFade } = useContext(FadeContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [headerBottomBorderDisplay, setHeaderBottomBorderDisplay] = useState(0);
  const [timeLineMinutes, setTimeLineMinutes] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const [details, setDetails] = useState({
    display: false,
    title: "",
    description: "",
    startTime: 0,
    endTime: 0,
    calendarName: "",
    alarm: 0,
  });

  const calendars = useSelector<ReduxStateI, CalendarI[]>(
    state => state.calendars.calendars
  );

  const dispatch = useDispatch();
  const [eventFormModalRef, setEventFormModalRef] =
    useState<React.RefObject<HTMLDivElement>>();
  const getRef = useCallback(
    (ref: React.RefObject<HTMLDivElement>) => setEventFormModalRef(ref),
    []
  );

  const [contextMenuStates, dispatchContextMenuStates] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case "contextMenuCoordinate":
          draft.x = action.payload.x;
          draft.y = action.payload.y;
          break;
        case "contextMenuDisplay":
          draft.display = action.payload.display;
          break;
        case "contextMenuId":
          draft.id = action.payload.id;
          break;
        case "contextMenuCalName":
          draft.calName = action.payload.calName;
          break;
        default:
          break;
      }
    },
    {
      x: 0,
      y: 0,
      display: false,
      id: 0,
      calName: "",
    }
  );

  const date = useSelector<ReduxStateI, Moment>(state => state.date.date);

  const timeStamp = useMemo(() => date.valueOf(), [date]);

  const events = useSelector<ReduxStateI, EventI[]>(state => {
    return state?.events && state?.events?.events["tasks"]
      ? state?.events?.events["tasks"][timeStamp] || []
      : [];
  });
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
    color: "blue",
    calId: 1,
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

  const onClickCreateEvent = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    e => {
      // prevent from right click
      if (e.button === 2 || eventForm.display) return;
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

  const onClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      if (e.button === 2 && isMouseDown) return;

      setEventForm(current => {
        return {
          ...current,
          display: !current?.display,
          calName: calendars[0]?.name,
        };
      });
      setIsMouseDown(true);
    },
    [calendars, isMouseDown]
  );

  const onEventFormHeaderMouseDown = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    e => {
      // coordinate on mousedown
      let x = e?.clientX;
      let y = e?.clientY;
      const { x: previousX, y: previousY } =
        eventFormModalRef && eventFormModalRef?.current
          ? eventFormModalRef?.current?.getBoundingClientRect()
          : { x: 0, y: 0 };

      const onMouseMove = (event: MouseEvent) => {
        if (eventFormModalRef && eventFormModalRef?.current?.style) {
          const dx = event?.clientX - x;
          const dy = event?.clientY - y;

          eventFormModalRef.current.style.top = `${previousY + dy}px`;
          eventFormModalRef.current.style.left = `${previousX + dx}px`;
        }
      };

      const onMouseUp = (e: MouseEvent) => {
        e.stopPropagation();

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        setIsMouseDown(false);
      };
      setIsMouseDown(true);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [eventFormModalRef]
  );

  const closeModalEventForm = useCallback(() => {
    setEventForm(current => ({ ...current, display: false }));
  }, []);

  // fetch events
  useEffect(() => {
    calendars.forEach(calendar => {
      if (calendar?.selected) {
        dispatch(
          getEvents.ac({ timeStamp: `${timeStamp}`, calName: calendar.name })
        );
      }
    });
  }, [dispatch, timeStamp, calendars]);

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
      color: eventForm.color,
      calId: eventForm.calId,
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
    eventForm.calId,
    eventForm.color,
    eventForm.description,
    eventForm.eventEndTime,
    eventForm.eventStartTime,
    eventForm.title,
    timeStamp,
  ]);

  const onEventMouseDown = useCallback(
    (id: number): onEventMouseDownT =>
      (e, ref) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMoved(false);

        if (ref.current && e.button === 0) {
          let mouseDownY = e.clientY;
          ref.current.style.zIndex = "200";
          const currentY = parseInt(ref.current.style.top, 10);

          const onMouseMove = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
          ) => {
            setIsMoved(true);
            ref.current && (ref.current.style.cursor = "move");
            const dy = e.clientY - mouseDownY;
            const plus = currentY + dy;
            const endLimit = 1380;
            const y = plus < 0 ? 0 : plus >= endLimit ? endLimit : plus;
            if (ref.current)
              ref.current.style.top = `${roundSpecific(y, 15)}px`;
          };

          const onMouseUp = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
          ) => {
            e.stopPropagation();
            if (ref.current) {
              ref.current.style.cursor = "initial";
              ref.current.style.zIndex = "90";
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

  const onEventBottomMouseDownSetIsMouseDownTrue = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const onBottomBorderMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const onEventRightClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number, calName) => {
      e.stopPropagation();

      dispatchContextMenuStates({
        type: "contextMenuCoordinate",
        payload: { x: e.clientX, y: e.clientY },
      });
      dispatchContextMenuStates({
        type: "contextMenuDisplay",
        payload: { display: true },
      });
      dispatchContextMenuStates({
        type: "contextMenuId",
        payload: { id: id },
      });
      dispatchContextMenuStates({
        type: "contextMenuCalName",
        payload: { calName: calName },
      });
    },
    [dispatchContextMenuStates]
  );

  const closeContextMenu = useCallback(() => {
    dispatchContextMenuStates({
      type: "contextMenuDisplay",
      payload: { display: false },
    });
  }, [dispatchContextMenuStates]);

  const onEventClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      {
        alarm,
        calendarName,
        description,
        endTime,
        startTime,
        title,
      }: EventDetailsI
    ) => {
      dispatchContextMenuStates({
        type: "contextMenuDisplay",
        payload: { display: false },
      });
      if (!isMoved)
        setDetails(current => ({
          ...current,
          display: true,
          description,
          alarm,
          calendarName,
          endTime,
          startTime,
          title,
        }));
    },
    [dispatchContextMenuStates, isMoved]
  );

  const onDocumentClickCloseModals = useCallback(() => {
    dispatchContextMenuStates({
      type: "contextMenuDisplay",
      payload: { display: false },
    });
    setEventForm(current => ({ ...current, display: false }));
    setDetails(current => ({ ...current, display: false }));
    closeFade();
  }, [closeFade, dispatchContextMenuStates]);

  useEffect(() => {
    document.addEventListener("mousedown", onDocumentClickCloseModals);

    mainRef?.current?.addEventListener("click", onDocumentClickCloseModals);
    mainRef?.current?.addEventListener(
      "contextmenu",
      onDocumentClickCloseModals
    );

    return () => {
      mainRef?.current?.removeEventListener(
        "click",
        onDocumentClickCloseModals
      );
      document?.removeEventListener("mousedown", onDocumentClickCloseModals);
      mainRef?.current?.removeEventListener(
        "contextmenu",
        onDocumentClickCloseModals
      );
    };
  }, [onDocumentClickCloseModals]);

  const closeDetails = useCallback(
    () => setDetails(current => ({ ...current, display: false })),
    []
  );
  const { display: sideBarDisplay } = useContext(SidebarContext);

  const onPlusClickOpenEventForm = useCallback(() => {
    setEventForm(current => ({ ...current, display: true }));
  }, []);

  const onCalChange = useCallback((calId: number) => {
    setEventForm(current => ({ ...current, calId }));
  }, []);

  const onColorChange = useCallback<OnColorChangeT>(color => {
    setEventForm(current => ({ ...current, color }));
  }, []);

  return (
    <div className={styles.Day} data-testid="Day">
      <Plus
        fullSize={sideBarDisplay}
        onClick={onPlusClickOpenEventForm}
        text={"اضافه کردن"}
        className={styles.Plus}
        disable={eventForm.display}
      />

      {/* event Details */}
      <Modal
        display={details.display}
        x={centerOFScreen().x}
        y={centerOFScreen().y}
        position="fixed"
        zIndex={200}
        width="448px"
        height="fit-content">
        <Details
          alarm={details.alarm}
          title={details.title}
          calendarName={details.calendarName}
          date={date}
          description={details.description}
          endTime={details.endTime}
          startTime={details.startTime}
          closeDetails={closeDetails}
        />
      </Modal>

      {/* contextMenu */}
      <Modal
        display={contextMenuStates.display}
        height="115px"
        width="192px"
        x={contextMenuStates.x}
        y={contextMenuStates.y}
        position="fixed"
        zIndex={140}>
        <ContextMenu
          closeContextMenu={closeContextMenu}
          timeStamp={timeStamp}
          id={contextMenuStates.id}
          calName={contextMenuStates.calName}
        />
      </Modal>

      {/* Event form */}
      <Modal
        display={eventForm.display}
        getRef={getRef}
        zIndex={210}
        height="fit-content"
        width="450px"
        position="fixed"
        x={eventForm.x}
        y={eventForm.y}>
        <EventForm
          onColorChange={onColorChange}
          onCalChange={onCalChange}
          calId={eventForm.calId}
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
        ref={mainRef}
        className={styles.main}
        onClick={e => {
          e.stopPropagation();
        }}
        onContextMenu={e => e.stopPropagation()}
        onScroll={e => {
          setHeaderBottomBorderDisplay(e.currentTarget.scrollTop);
        }}>
        <div className={styles.space}></div>
        <div
          className={styles.CalendarWrapper}
          data-testid="calendarWrapper"
          onClick={e => {
            onClickCreateEvent(e);
            onClick(e);
          }}>
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
            className="pointer"
            boxShadow={false}
            data-testid="Task"
            backgroundColor={eventForm.color}
            x={0}
            y={eventForm.eventStartTime}
            resizeAble={true}
            width={`${100}%`}
            display={eventForm.display}
            height={`${eventForm.eventEndTime}px`}
          />

          {/* Event */}
          {events.map(
            (
              { title, endTime, description, startTime, id, color, calId },
              index
            ) => (
              <Modal
                key={index}
                borderRadios="8px"
                children={
                  <Task title={title} endTime={endTime} startTime={startTime} />
                }
                boxShadow={false}
                data-testid="Task"
                backgroundColor={color}
                x={0}
                y={startTime}
                resizeAble={true}
                width={`${100}%`}
                display={true}
                height="60px"
                onBottomBorderMouseDownOuter={
                  onEventBottomMouseDownSetIsMouseDownTrue
                }
                onClick={e =>
                  onEventClick(e, {
                    alarm: 0,
                    description,
                    calendarName: "Tasks",
                    endTime,
                    startTime,
                    title,
                  })
                }
                onBottomBorderMouseUpOuter={onBottomBorderMouseUp}
                onMouseDown={onEventMouseDown(id || 0)}
                onRightClick={e => onEventRightClick(e, id || 0, calId)}
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
