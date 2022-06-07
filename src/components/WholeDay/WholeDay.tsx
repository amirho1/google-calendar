import React, { FC, useCallback, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { EventI } from "../../redux/reducers/events/events";
import { EventDetailsI, EventFormI } from "../Day/Day";
import Event from "../Event/Event";
import HoverCircle from "../HoverCircle/HoverCircle";
import { PrimitivesT } from "../Table/Table";
import styles from "./WholeDay.module.scss";

type VoidFunc = () => void;

interface WholeDayProps {
  events: EventI[];
  timeStamp: number;
  onBottomBorderMouseUp: VoidFunc;
  onBottomBorderMouseMove: VoidFunc;
  onEventBottomMouseDownSetIsMouseDownTrue: VoidFunc;
  onEventClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    { description, endTime, startTime, title }: EventDetailsI
  ) => void;
  onEventRightClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    calId: string
  ) => void;
  setEventForm: React.Dispatch<React.SetStateAction<EventFormI>>;
  setIsMoved: (value: React.SetStateAction<boolean>) => void;
  children?: JSX.Element | PrimitivesT;
}

const WholeDay: FC<WholeDayProps> = ({
  events = [],
  timeStamp,
  onBottomBorderMouseUp,
  onBottomBorderMouseMove,
  onEventBottomMouseDownSetIsMouseDownTrue,
  onEventClick,
  onEventRightClick,
  setEventForm,
  setIsMoved,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const cb = useCallback(
    (event, index) => (
      <Event
        key={index}
        position="relative"
        WholeDay={true}
        event={event}
        timeStamp={timeStamp}
        onBottomBorderMouseUp={onBottomBorderMouseUp}
        onBottomBorderMouseMove={onBottomBorderMouseMove}
        move={false}
        onEventBottomMouseDownSetIsMouseDownTrue={
          onEventBottomMouseDownSetIsMouseDownTrue
        }
        onEventClick={onEventClick}
        onEventRightClick={onEventRightClick}
        setEventForm={setEventForm}
        setIsMoved={setIsMoved}
      />
    ),
    [
      onBottomBorderMouseMove,
      onBottomBorderMouseUp,
      onEventBottomMouseDownSetIsMouseDownTrue,
      onEventClick,
      onEventRightClick,
      setEventForm,
      setIsMoved,
      timeStamp,
    ]
  );

  const moreEventSign = useMemo(() => {
    return (
      <div
        key={3}
        className={`hoverBGGray ${styles.moreEventSign} pointer`}
        onClick={() => setIsOpen(true)}>
        {events.length - 2} مورد دیگر
      </div>
    );
  }, [events]);

  const mappedEvents = useCallback(() => {
    if (!events.length) return null;
    else if (isOpen) return events.map(cb);
    else if (events.length > 3 && !isOpen)
      return [...[events[0], events[1]].map(cb), moreEventSign];

    return events.map(cb);
  }, [cb, events, moreEventSign, isOpen]);

  const openWholeDay = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeWholeDay = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div
      className={`${styles.WholeDay} ${isOpen ? styles.open : styles.close}`}
      data-testid="WholeDay">
      {mappedEvents()}
      {children}
      {events.length && events.length > 3 ? (
        <>
          <HoverCircle
            width="30px"
            height="30px"
            className={`${styles.chevron} ${!isOpen ? "" : "d-none"}`}
            dataTip="بزرگ کردن بخش کل روز">
            <div onClick={openWholeDay}>
              <FaChevronDown />
            </div>
          </HoverCircle>
          <HoverCircle
            width="30px"
            height="30px"
            className={`${styles.chevron} ${isOpen ? "" : "d-none"}`}
            dataTip="کوچک کردن بخش کل روز">
            <div onClick={closeWholeDay}>
              <FaChevronUp />
            </div>
          </HoverCircle>
        </>
      ) : null}
    </div>
  );
};

export default WholeDay;
