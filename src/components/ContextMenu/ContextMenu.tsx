import React, { FC, MouseEventHandler, useCallback, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectEventById } from "../../redux/reducers/events/selectors";
import { selectCalendarById } from "../../redux/sagas/calendars/selectors";
import { deleteEvent, updateEvent } from "../../redux/sagas/events";
import Button from "../Button/Button";
import ColorForm from "../ColorForm/ColorForm";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {
  id: number;
  calId: number;
  timeStamp: number;
  closeContextMenu: () => void;
  color: string;
}

const ContextMenu: FC<ContextMenuProps> = ({
  id,
  timeStamp,
  closeContextMenu,
  color,
  calId,
}) => {
  const dispatch = useDispatch();
  const calName = useSelector(selectCalendarById(calId))?.name || "";
  console.log(calName);
  const event = useSelector(selectEventById({ id, calName, timeStamp }));

  const onDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    e => {
      e.stopPropagation();
      dispatch(deleteEvent.ac({ id, calName, timeStamp }));
      closeContextMenu();
    },
    [calName, closeContextMenu, dispatch, id, timeStamp]
  );

  useEffect(() => {
    document.addEventListener("click", closeContextMenu);

    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, [closeContextMenu]);

  const changeEventColor = useCallback(
    (color: string) => {
      const eventCopy = event && { ...event };

      if (eventCopy) {
        eventCopy.color = color;
        dispatch(
          updateEvent.ac({ id: id, body: eventCopy, calName, timeStamp })
        );
      }
    },
    [calName, dispatch, event, id, timeStamp]
  );

  return (
    <div
      className={`${styles.ContextMenu} d-flex`}
      data-testid="ContextMenu"
      onMouseDown={e => e.stopPropagation()}>
      <Button
        className={`${styles.delete} owl-mright hoverBGGray`}
        onClick={e => onDeleteClick(e)}>
        <>
          <FaTrash />
          <span>حذف</span>
        </>
      </Button>

      <ColorForm color={color} onColorChange={changeEventColor} />
    </div>
  );
};

export default ContextMenu;
