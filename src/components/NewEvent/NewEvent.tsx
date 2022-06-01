import React, { FC } from "react";
import { EventFormStateI } from "../Day/Day";
import Modal from "../Modal/Modal";
import Task from "../Task/Task";

interface NewEventProps {
  eventForm: EventFormStateI;
  onNewEventResize: (height: number | undefined) => void;
}

const NewEvent: FC<NewEventProps> = ({ eventForm, onNewEventResize }) => {
  return (
    <Modal
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
      onResize={onNewEventResize}
      onMouseDown={(e, ref) => {}}>
      <Task
        startTime={eventForm.eventStartTime}
        endTime={eventForm.eventEndTime}
      />
    </Modal>
  );
};

export default NewEvent;
