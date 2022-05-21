import React, { FC, MouseEventHandler, useCallback, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectEventById } from "../../redux/reducers/events/selectors";
import { deleteEvent, updateEvent } from "../../redux/sagas/events";
import Button from "../Button/Button";
import ColorForm from "../ColorForm/ColorForm";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {
  id: string;
  calId: string;
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
  const event = useSelector(selectEventById({ id, calId, timeStamp }));

  const onDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    e => {
      e.stopPropagation();
      dispatch(deleteEvent.ac({ id, calId, timeStamp }));
      closeContextMenu();
    },
    [calId, closeContextMenu, dispatch, id, timeStamp]
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
        dispatch(updateEvent.ac({ id: id, body: eventCopy, calId, timeStamp }));
      }
    },
    [calId, dispatch, event, id, timeStamp]
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

      <ColorForm
        color={color}
        onColorChange={changeEventColor}
        closeColorForm={closeContextMenu}
      />
    </div>
  );
};

export default ContextMenu;
