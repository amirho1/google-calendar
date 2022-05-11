import React, { FC, useCallback, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tippy";
import { CalendarI, updateCalendar } from "../../../redux/sagas/calendars";
import Checkbox from "../../Checkbox/Checkbox";
import ColorForm from "../../ColorForm/ColorForm";
import HoverCircle from "../../HoverCircle/HoverCircle";
import Modal from "../../Modal/Modal";
import { IItem } from "../../ULLinks/ULLinks";
import styles from "./CalRow.module.scss";

interface OptionsProps {
  item: IItem;
  calendar: CalendarI;
  onCalendarDelete: (id: number, calName: string) => void;
}

const CalRow: FC<OptionsProps> = ({
  calendar: { id, color, name, selected, description },
  item,
  onCalendarDelete,
}) => {
  const dispatch = useDispatch();
  const [colorFormDisplay, setColorFormDisplay] = useState(false);

  const onColorChange = (color: string) => {
    dispatch(
      updateCalendar.ac({ id, color: color, name, selected, description })
    );
  };

  const onCalendarSelectAndDeselect = useCallback(
    (newCalendar: CalendarI) => {
      dispatch(updateCalendar.ac(newCalendar));
    },
    [dispatch]
  );

  const changeColorFormDisplay = useCallback(e => {
    e.stopPropagation();
    setColorFormDisplay(current => !current);
  }, []);

  const closeColorForm = useCallback(() => {
    setColorFormDisplay(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeColorForm);
    return () => {
      document.removeEventListener("mousedown", closeColorForm);
    };
  }, [closeColorForm]);

  return (
    <div
      className={`${styles.row} f-between`}
      onMouseDown={e => e.stopPropagation()}>
      <Checkbox
        value={selected}
        color={color}
        onChange={() =>
          onCalendarSelectAndDeselect({
            id,
            color,
            name,
            description,
            selected: !selected,
          })
        }
      />

      <Tooltip title={item.tag as any}>
        <label htmlFor="" className={styles.myCalenders}>
          {item.tag}
        </label>
      </Tooltip>
      <div className={`${!colorFormDisplay ? styles.setting : ""} f-between`}>
        <HoverCircle
          backgroundColor="var(--dark)"
          className={styles.hoverColWhite}
          dataTip="حذف">
          <div onClick={() => id && onCalendarDelete(id, item.tag as string)}>
            <FaTimes />
          </div>
        </HoverCircle>

        <HoverCircle
          backgroundColor="var(--dark)"
          className={styles.hoverColWhite}
          width="25px"
          height="25px">
          <div className="f-center" onClick={changeColorFormDisplay}>
            <Tooltip title="Click to view">
              <BsThreeDotsVertical />
            </Tooltip>
          </div>
        </HoverCircle>

        <Modal
          width="200px"
          zIndex={150}
          height="fix-content"
          display={colorFormDisplay}>
          <ColorForm
            color={color}
            closeColorForm={closeColorForm}
            onColorChange={onColorChange}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CalRow;
