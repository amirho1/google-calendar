import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../redux/sagas/events";
import Button from "../Button/Button";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {
  id: number;
  calName: string;
  timeStamp: number;
  closeContextMenu: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({
  id,
  calName,
  timeStamp,
  closeContextMenu,
}) => {
  const dispatch = useDispatch();

  const colors = useMemo<{ name: string; color: string }[]>(
    () => [
      { name: "قرمز", color: "red" },
      { name: "آبی", color: "blue" },
      { name: "زرد", color: "yellow" },
      { name: "سبز", color: "green" },
      { name: "بنفش", color: "purple" },
      { name: "نارنجی", color: "orange" },
      { name: "صورتی", color: "pink" },
    ],
    []
  );

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

      <div className={`${styles.colorWrapper} f-between`}>
        {colors.map((color, index) => (
          <div
            className={styles.color}
            key={index}
            style={{ backgroundColor: color.color }}
            data-tip={color.name}></div>
        ))}
      </div>
    </div>
  );
};

export default ContextMenu;
