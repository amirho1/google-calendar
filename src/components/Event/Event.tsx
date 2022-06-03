import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventI } from "../../redux/reducers/events/events";
import { selectCalendarById } from "../../redux/sagas/calendars/selectors";
import { updateEvent } from "../../redux/sagas/events";
import { roundSpecific } from "../../utils/helpers";
import { EventDetailsI, EventFormI } from "../Day/Day";
import Modal, { onEventMouseDownT, OnResizeT } from "../Modal/Modal";
import Task from "../Task/Task";

interface EventProps {
  event: EventI;
  onEventClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    { description, endTime, startTime, title }: EventDetailsI
  ) => void;
  onEventBottomMouseDownSetIsMouseDownTrue: () => void;
  onBottomBorderMouseUp: () => void;
  onEventRightClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    calId: string
  ) => void;
  timeStamp: number;
  setIsMoved: (value: React.SetStateAction<boolean>) => void;
  setEventForm: React.Dispatch<React.SetStateAction<EventFormI>>;
  onBottomBorderMouseMove: () => void;
}

const Event: FC<EventProps> = ({
  event: { calId, color, description, endTime, startTime, title, _id },
  onEventBottomMouseDownSetIsMouseDownTrue,
  onEventClick,
  onBottomBorderMouseUp,
  onEventRightClick,
  setEventForm,
  timeStamp,
  setIsMoved,
  onBottomBorderMouseMove,
}) => {
  const dispatch = useDispatch();
  const calName = useSelector(selectCalendarById(calId))?.name;

  const onEventMouseDown = useCallback(
    (event: EventI): onEventMouseDownT =>
      (e, ref) => {
        e.preventDefault();
        e.stopPropagation();

        setIsMoved(false);
        setEventForm(current => ({ ...current, calId: event.calId }));
        if (ref.current && e.button === 0) {
          let mouseDownY = e.clientY;
          ref.current.style.zIndex = "200";
          const currentY = parseInt(ref.current.style.top, 10);
          let updatedEvent: EventI;

          const onMouseMove = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
          ) => {
            setIsMoved(true);
            ref.current && (ref.current.style.cursor = "move");
            const dy = e.clientY - mouseDownY;
            const plus = currentY + dy;
            const endLimit = 1380;
            const y = plus < 0 ? 0 : plus >= endLimit ? endLimit : plus;
            const roundedSpecific = roundSpecific(y, 15);
            updatedEvent = { ...event, startTime: roundedSpecific };
            if (ref.current) ref.current.style.top = `${roundedSpecific}px`;
          };

          const onMouseUp = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
          ) => {
            e.stopPropagation();

            const didEventMoved = updatedEvent?.startTime !== event?.startTime;
            if (event._id && calName && updatedEvent && didEventMoved) {
              dispatch(
                updateEvent.ac({
                  body: updatedEvent,
                  id: event._id,
                  calId,
                  timeStamp,
                })
              );
            }
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
    [calId, calName, dispatch, setEventForm, setIsMoved, timeStamp]
  );

  const onResize = useCallback<OnResizeT>(
    height => {
      const didHeightChanged = height !== endTime;
      if (didHeightChanged && _id && height && calName) {
        const event = {
          calId,
          color,
          description,
          endTime: height,
          startTime,
          title,
          _id,
          timeStamp,
        };
        dispatch(updateEvent.ac({ body: event, calId, id: _id, timeStamp }));
      }
    },
    [
      _id,
      calId,
      calName,
      color,
      description,
      dispatch,
      endTime,
      startTime,
      timeStamp,
      title,
    ]
  );

  return (
    <Modal
      borderRadios="8px"
      boxShadow={false}
      data-testid="Task"
      backgroundColor={color}
      x={0}
      y={startTime}
      resizeAble={true}
      width={`${100}%`}
      display={true}
      height={`${endTime}px`}
      onResize={onResize}
      onBottomBorderMouseMove={onBottomBorderMouseMove}
      onBottomBorderMouseDownOuter={onEventBottomMouseDownSetIsMouseDownTrue}
      onClick={e => {
        e.stopPropagation();
        onEventClick(e, {
          calId,
          color,
          description,
          endTime,
          startTime,
          title,
          _id,
          display: true,
          timeStamp,
        });
      }}
      onBottomBorderMouseUpOuter={onBottomBorderMouseUp}
      onMouseDown={onEventMouseDown({
        title,
        endTime,
        description,
        startTime,
        _id,
        color,
        calId,
        timeStamp,
      })}
      onRightClick={e => onEventRightClick(e, _id || "", calId)}>
      <>
        <Task title={title} endTime={endTime} startTime={startTime} />
      </>
    </Modal>
  );
};
export default Event;
