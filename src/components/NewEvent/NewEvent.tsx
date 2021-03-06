import React, { FC, useCallback } from "react";
import { roundSpecific, stopPropagation } from "../../utils/helpers";
import { EventFormI } from "../Day/Day";
import Modal, { onEventMouseDownT } from "../Modal/Modal";
import Task from "../Task/Task";

interface NewEventProps {
  eventForm: EventFormI;
  onNewEventResize: (height: number | undefined) => void;
  onNewEventMove: (startTime: number) => void;
  onNewEventMouseDown?: (e: MouseEvent) => void;
  onNewEventMouseUp?: (e: MouseEvent) => void;
  position?: "fixed" | "relative" | "absolute";
  wholeDay?: boolean;
}

const NewEvent: FC<NewEventProps> = ({
  eventForm,
  onNewEventResize,
  onNewEventMove,
  onNewEventMouseDown,
  onNewEventMouseUp,
  position,
  wholeDay,
}) => {
  const onNewEventMouseDownCustom = useCallback<onEventMouseDownT>(
    (e, ref) => {
      e.stopPropagation();
      onNewEventMouseDown && onNewEventMouseDown(e as any);
      if (ref.current && e.button === 0) {
        let mouseDownY = e.clientY;
        ref.current.style.zIndex = "200";
        const currentY = parseInt(ref.current.style.top, 10);
        let roundedSpecific: number = 0;

        const onMouseMove = (
          e: React.MouseEvent<HTMLDivElement, MouseEvent>
        ) => {
          ref.current && (ref.current.style.cursor = "move");
          const dy = e.clientY - mouseDownY;
          const plus = currentY + dy;
          const endLimit = 1440 - eventForm.eventEndTime;
          const y = plus < 0 ? 0 : plus >= endLimit ? endLimit : plus;
          roundedSpecific = roundSpecific(y, 15);
          if (ref.current) ref.current.style.top = `${roundedSpecific}px`;
        };

        const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          onNewEventMove(roundedSpecific);
          onNewEventMouseUp && onNewEventMouseUp(e as any);

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
    [
      eventForm.eventEndTime,
      onNewEventMouseDown,
      onNewEventMouseUp,
      onNewEventMove,
    ]
  );
  return (
    <Modal
      className="pointer"
      boxShadow={false}
      borderRadios="8px"
      data-testid="Task"
      backgroundColor={eventForm.color}
      x={0}
      y={eventForm.eventStartTime}
      resizeAble={wholeDay ? false : true}
      position={position}
      width={`${100}%`}
      display={!wholeDay ? eventForm.display : eventForm.wholeDayDisplay}
      height={`${eventForm.eventEndTime}px`}
      onClick={stopPropagation}
      onResize={onNewEventResize}
      onMouseDown={onNewEventMouseDownCustom}>
      <Task
        wholeDay={wholeDay}
        startTime={eventForm.eventStartTime}
        endTime={eventForm.eventEndTime}
      />
    </Modal>
  );
};

export default NewEvent;
